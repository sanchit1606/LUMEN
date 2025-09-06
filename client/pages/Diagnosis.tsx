import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  MicOff, 
  Upload, 
  Send, 
  Loader2, 
  FileText, 
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Volume2
} from "lucide-react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";

interface DiagnosisResult {
  diagnosis: string;
  severity: "low" | "medium" | "high";
  recommendations: string[];
  urgency: string;
  followUp: string;
}

export default function DiagnosisPage() {
  const [activeTab, setActiveTab] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError("Failed to access microphone. Please check permissions.");
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Simulate audio processing with Whisper
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockTranscription = "I have been experiencing headaches and fever for the past 3 days. The headache is persistent and gets worse in the evening.";
      setTranscribedText(mockTranscription);
      await processDiagnosis(mockTranscription);
    } catch (err) {
      setError("Failed to process audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/jpg',
        'application/pdf', 
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid file (JPG, PNG, PDF, DOC, DOCX)");
        return;
      }
      
      setUploadedFile(file);
      setError(null);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockExtractedText = "Patient reports chronic fatigue, joint pain, and difficulty sleeping. Symptoms have persisted for 2 weeks. No fever reported.";
      await processDiagnosis(mockExtractedText);
    } catch (err) {
      setError("Failed to process file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const processDiagnosis = async (inputText: string) => {
    try {
      // Simulate AI diagnosis processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock diagnosis result
      const mockResult: DiagnosisResult = {
        diagnosis: "Based on the symptoms described, this appears to be a viral infection with possible tension headaches. The combination of fever and persistent headaches suggests an upper respiratory tract infection.",
        severity: inputText.toLowerCase().includes("severe") || inputText.toLowerCase().includes("emergency") ? "high" : 
                 inputText.toLowerCase().includes("pain") || inputText.toLowerCase().includes("fever") ? "medium" : "low",
        recommendations: [
          "Rest and maintain adequate hydration",
          "Take over-the-counter fever reducers as needed",
          "Monitor symptoms for any worsening",
          "Seek medical attention if fever exceeds 102°F (39°C)"
        ],
        urgency: inputText.toLowerCase().includes("severe") ? "Seek immediate medical attention" : "Monitor symptoms, consult a healthcare provider if they worsen",
        followUp: "Follow up with your primary care physician within 3-5 days if symptoms persist or worsen"
      };
      
      setResult(mockResult);
    } catch (err) {
      setError("Failed to generate diagnosis. Please try again.");
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      setError("Please enter your symptoms");
      return;
    }
    setError(null);
    setIsProcessing(true);
    processDiagnosis(textInput);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertCircle className="h-5 w-5" />;
      case "medium": return <AlertTriangle className="h-5 w-5" />;
      case "low": return <CheckCircle className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Symptoms-Based Diagnosis & Guidance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your symptoms through text, voice, or document upload for AI-powered health guidance
            </p>
            
            {/* Model Information */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                <span className="font-medium">Prototype Models:</span>
              </Badge>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                ai4bharat/indic-gpt
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                openai/whisper-small
              </Badge>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                coqui/XTTS-v2
              </Badge>
            </div>
            
            {/* Future Models */}
            <p className="text-sm text-muted-foreground mt-2">
              Future deployment: GPT-4/GPT-5 (chat completion), Whisper (ASR), OpenAI TTS
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Describe Your Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text Input</TabsTrigger>
                    <TabsTrigger value="audio">Voice Recording</TabsTrigger>
                    <TabsTrigger value="upload">File Upload</TabsTrigger>
                  </TabsList>
                  
                  {/* Text Input Tab */}
                  <TabsContent value="text" className="mt-4">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Describe your symptoms in detail... (e.g., headache, fever, duration, severity, any other relevant information)"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        rows={6}
                        className="resize-none"
                      />
                      <Button 
                        onClick={handleTextSubmit}
                        disabled={isProcessing || !textInput.trim()}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Analyze Symptoms
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Audio Recording Tab */}
                  <TabsContent value="audio" className="mt-4">
                    <div className="space-y-4">
                      <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="mb-4">
                          {isRecording ? (
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
                                <Mic className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-sm text-red-600 font-medium">Recording...</p>
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                              <Mic className="h-8 w-8 text-gray-600" />
                            </div>
                          )}
                        </div>
                        
                        <Button
                          onClick={isRecording ? stopRecording : startRecording}
                          disabled={isProcessing}
                          variant={isRecording ? "destructive" : "default"}
                          className="mb-4"
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="mr-2 h-4 w-4" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="mr-2 h-4 w-4" />
                              Start Recording
                            </>
                          )}
                        </Button>
                        
                        {transcribedText && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-left">
                            <p className="text-sm text-gray-600 mb-1">Transcribed:</p>
                            <p className="text-sm">{transcribedText}</p>
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-500">
                          Click to start recording your symptoms. Speak clearly and describe your condition in detail.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* File Upload Tab */}
                  <TabsContent value="upload" className="mt-4">
                    <div className="space-y-4">
                      <div 
                        className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-300 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        
                        <div className="mb-4">
                          {uploadedFile ? (
                            <div className="flex flex-col items-center">
                              <FileText className="h-12 w-12 text-green-600 mb-2" />
                              <p className="font-medium">{uploadedFile.name}</p>
                              <p className="text-sm text-gray-500">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600">Click to upload a file</p>
                            </>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                        </p>
                      </div>
                      
                      {uploadedFile && (
                        <Button
                          onClick={() => {
                            setUploadedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Remove File
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="mt-4 flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-blue-600">Processing your symptoms...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Diagnosis & Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    {/* Severity Indicator */}
                    <div className={`p-4 rounded-lg border ${getSeverityColor(result.severity)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {getSeverityIcon(result.severity)}
                        <span className="font-medium capitalize">
                          {result.severity} Priority
                        </span>
                      </div>
                      <p className="text-sm">{result.urgency}</p>
                    </div>
                    
                    {/* Diagnosis */}
                    <div>
                      <h3 className="font-semibold mb-2">Preliminary Assessment</h3>
                      <p className="text-gray-700">{result.diagnosis}</p>
                    </div>
                    
                    {/* Recommendations */}
                    <div>
                      <h3 className="font-semibold mb-2">Recommendations</h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Follow-up */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Follow-up Care</h3>
                      <p className="text-sm text-gray-700">{result.followUp}</p>
                    </div>
                    
                    {/* Disclaimer */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Disclaimer:</strong> This is an AI-generated assessment for informational purposes only. 
                        Always consult with a qualified healthcare professional for proper medical diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Enter your symptoms using any of the input methods to receive AI-powered health guidance.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
