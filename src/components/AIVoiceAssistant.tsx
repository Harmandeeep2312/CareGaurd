import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Mic, MicOff, AlertCircle, Loader, X, Volume2, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  getMedicalGuidance,
  detectEmergency,
  getEmergencySOS,
} from "../utils/medicalAI";

export interface AIVoiceAssistantHandle {
  startListening: () => void;
}

const AIVoiceAssistant = forwardRef<AIVoiceAssistantHandle>((_, ref) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sosTriggered, setSOSTriggered] = useState(false);
  const [currentGuidance, setCurrentGuidance] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout>();

  // Expose startListening to parent via ref
  useImperativeHandle(ref, () => ({
    startListening: () => openAndListen(),
  }));

  const openAndListen = () => {
    setShowModal(true);
    setCurrentGuidance("");
    setTranscript("");
    setSOSTriggered(false);
    setTimeout(() => startRecognition(), 400);
  };

  const startRecognition = () => {
    if (!isBrowserSupported || !recognitionRef.current) return;
    try {
      recognitionRef.current.start();
    } catch {
      // already running
    }
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      setIsBrowserSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setIsListening(true);

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += t + " ";
        else interimTranscript += t;
      }
      if (finalTranscript) processVoiceInput(finalTranscript.trim());
      setTranscript(interimTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      toast.error(`Mic error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => setIsListening(false);

    return () => {
      recognitionRef.current?.abort();
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
    };
  }, []);

  const processVoiceInput = async (input: string) => {
    if (!input.trim()) return;
    stopRecognition();
    setIsProcessing(true);
    setTranscript(input);
    try {
      if (detectEmergency(input)) { triggerSOS(); return; }
      const guidance = await getMedicalGuidance(input);
      setCurrentGuidance(guidance);
      speakResponse(guidance);
      processingTimeoutRef.current = setTimeout(() => setShowModal(false), 15000);
    } catch {
      setCurrentGuidance("Sorry, I couldn't process that. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerSOS = () => {
    setSOSTriggered(true);
    setIsProcessing(false);
    const msg = getEmergencySOS();
    setCurrentGuidance(msg);
    speakResponse(msg);
    toast.error("🚨 SOS ALERT triggered!", { duration: 10000 });
  };

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.88; u.pitch = 1;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  };

  const closeModal = () => {
    stopRecognition();
    speechSynthesis.cancel();
    setShowModal(false);
    setTranscript("");
    setCurrentGuidance("");
    setSOSTriggered(false);
    setIsProcessing(false);
    if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
  };

  if (!isBrowserSupported) return null;

  type Phase = "idle" | "listening" | "processing" | "result" | "sos";
  const phase: Phase = sosTriggered ? "sos"
    : isProcessing ? "processing"
    : currentGuidance ? "result"
    : isListening ? "listening"
    : "idle";

  const isSOS = phase === "sos";

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,28,72,0.6)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 28,
              overflow: "hidden",
              background: "linear-gradient(175deg,#ffffff 0%,#eff6ff 55%,#dbeeff 100%)",
              border: "1.5px solid rgba(59,130,246,0.2)",
              boxShadow: "0 32px 80px rgba(29,78,216,0.22), 0 8px 24px rgba(29,78,216,0.12)",
              animation: "vaModalIn 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
          >
            {/* Accent bar */}
            <div style={{
              height: 5,
              background: isSOS
                ? "linear-gradient(90deg,#dc2626,#f87171)"
                : "linear-gradient(90deg,#1d4ed8 0%,#3b82f6 50%,#7dd3fc 100%)",
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  borderRadius: 16,
                  padding: "10px",
                  background: isSOS
                    ? "linear-gradient(135deg,#fee2e2,#fecaca)"
                    : "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                  display: "flex",
                }}>
                  {isSOS
                    ? <AlertCircle style={{ width: 20, height: 20, color: "#dc2626" }} />
                    : <Mic style={{ width: 20, height: 20, color: "#2563eb" }} />}
                </div>
                <div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: isSOS ? "#991b1b" : "#1e3a8a",
                    fontFamily: "system-ui,sans-serif",
                    letterSpacing: "-0.3px",
                  }}>
                    {isSOS ? "🚨 Emergency Alert" : "Voice Assistant"}
                  </div>
                  <div style={{ fontSize: 12, color: "#60a5fa", fontWeight: 500 }}>
                    {isSOS ? "Help is being contacted" : "AI Medical Guidance"}
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  border: "none", cursor: "pointer", borderRadius: "50%",
                  width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(59,130,246,0.08)", transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.08)")}
              >
                <X style={{ width: 16, height: 16, color: "#60a5fa" }} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>

              {/* Mic orb */}
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, height: 120 }}>
                {/* Pulse rings */}
                {(phase === "listening" || phase === "sos") && (
                  <>
                    <div style={{
                      position: "absolute", borderRadius: "50%", width: 116, height: 116,
                      background: isSOS ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.1)",
                      animation: "vaPing 1.5s ease-out infinite",
                    }} />
                    <div style={{
                      position: "absolute", borderRadius: "50%", width: 94, height: 94,
                      background: isSOS ? "rgba(239,68,68,0.18)" : "rgba(59,130,246,0.16)",
                      animation: "vaPing 1.5s ease-out infinite 0.45s",
                    }} />
                  </>
                )}

                <button
                  onClick={() => {
                    if (phase === "listening") stopRecognition();
                    else if (phase === "idle" || phase === "result") {
                      setCurrentGuidance(""); setTranscript(""); startRecognition();
                    }
                  }}
                  disabled={phase === "processing" || phase === "sos"}
                  style={{
                    position: "relative", zIndex: 2,
                    width: 72, height: 72, borderRadius: "50%", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease",
                    background: isSOS
                      ? "linear-gradient(135deg,#ef4444,#b91c1c)"
                      : phase === "processing"
                        ? "linear-gradient(135deg,#f59e0b,#d97706)"
                        : phase === "listening"
                          ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
                          : "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                    boxShadow: isSOS
                      ? "0 0 0 5px rgba(239,68,68,0.25), 0 12px 28px rgba(220,38,38,0.4)"
                      : phase === "listening"
                        ? "0 0 0 5px rgba(59,130,246,0.25), 0 12px 28px rgba(29,78,216,0.45)"
                        : "0 8px 24px rgba(59,130,246,0.38)",
                  }}
                >
                  {phase === "processing"
                    ? <Loader style={{ width: 30, height: 30, color: "white", animation: "spin 1s linear infinite" }} />
                    : phase === "sos"
                      ? <Phone style={{ width: 30, height: 30, color: "white" }} />
                      : phase === "listening"
                        ? <Mic style={{ width: 30, height: 30, color: "white" }} />
                        : <MicOff style={{ width: 30, height: 30, color: "white" }} />}
                </button>
              </div>

              {/* Status text */}
              <p style={{
                fontSize: 14, fontWeight: 600, marginBottom: 4, textAlign: "center",
                color: isSOS ? "#b91c1c"
                  : phase === "processing" ? "#b45309"
                  : phase === "listening" ? "#1d4ed8"
                  : "#3b82f6",
                fontFamily: "system-ui,sans-serif",
              }}>
                {phase === "listening" ? "🎙️ Listening… speak now"
                  : phase === "processing" ? "⏳ Analysing your query…"
                  : phase === "sos" ? "🚨 Emergency mode active"
                  : phase === "result" ? "✅ Tap mic to ask again"
                  : "Tap the mic to begin"}
              </p>

              {/* Live transcript */}
              {(transcript || phase === "listening") && (
                <div style={{
                  width: "100%", borderRadius: 16, padding: "10px 14px", marginTop: 12, marginBottom: 4,
                  background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.14)",
                  fontSize: 13, color: "#1e40af", textAlign: "center", minHeight: 42,
                  fontStyle: transcript ? "normal" : "italic",
                  fontFamily: "system-ui,sans-serif", lineHeight: 1.5,
                }}>
                  {transcript || "Waiting for your voice…"}
                </div>
              )}

              {/* Guidance card */}
              {currentGuidance && (
                <div style={{
                  width: "100%", borderRadius: 18, padding: "14px 16px", marginTop: 14,
                  background: isSOS
                    ? "linear-gradient(135deg,#fee2e2,#fef2f2)"
                    : "linear-gradient(135deg,#eff6ff,#dbeafe)",
                  border: isSOS
                    ? "1.5px solid rgba(239,68,68,0.28)"
                    : "1.5px solid rgba(59,130,246,0.22)",
                }}>
                  <p style={{
                    fontSize: 13, lineHeight: 1.65, fontWeight: 500,
                    color: isSOS ? "#7f1d1d" : "#1e3a8a",
                    fontFamily: "system-ui,sans-serif",
                    margin: 0,
                  }}>
                    {currentGuidance}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 18 }}>
                {currentGuidance && (
                  <button
                    onClick={() => speakResponse(currentGuidance)}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      borderRadius: 14, padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer",
                      background: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                      color: "#1d4ed8", border: "1px solid rgba(59,130,246,0.2)",
                      fontFamily: "system-ui,sans-serif", transition: "all 0.2s",
                    }}
                  >
                    <Volume2 style={{ width: 15, height: 15 }} /> Repeat
                  </button>
                )}
                {isSOS && (
                  <button
                    onClick={() => { setSOSTriggered(false); setCurrentGuidance(""); }}
                    style={{
                      flex: 1, borderRadius: 14, padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer",
                      background: "linear-gradient(135deg,#fee2e2,#fecaca)",
                      color: "#b91c1c", border: "1px solid rgba(239,68,68,0.2)",
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    Dismiss SOS
                  </button>
                )}
                <button
                  onClick={closeModal}
                  style={{
                    flex: 1, borderRadius: 14, padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    background: "rgba(59,130,246,0.08)", color: "#2563eb",
                    border: "1px solid rgba(59,130,246,0.15)",
                    fontFamily: "system-ui,sans-serif", transition: "all 0.2s",
                  }}
                >
                  Close
                </button>
              </div>

              <p style={{ fontSize: 11, color: "#93c5fd", marginTop: 14, textAlign: "center" }}>
                ⚠️ For life-threatening emergencies, call your local emergency number immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes vaModalIn {
          from { opacity: 0; transform: translateY(36px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes vaPing {
          0%   { transform: scale(1);    opacity: 0.75; }
          100% { transform: scale(1.75); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
});

AIVoiceAssistant.displayName = "AIVoiceAssistant";
export default AIVoiceAssistant;