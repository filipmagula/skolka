// src/tts.ts
class TextToSpeech {
  private static instance: TextToSpeech;
  readonly synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  private constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  public static getInstance(): TextToSpeech {
    if (!TextToSpeech.instance) {
      TextToSpeech.instance = new TextToSpeech();
    }
    return TextToSpeech.instance;
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
    if (this.voices.length === 0) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  public speak(text: string, lang: string = 'cs-CZ'): void {
    if (this.synth.speaking) {
      this.synth.cancel()
      console.error('SpeechSynthesis is already speaking. Speech canceled.');
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    const voice = this.voices.find(voice => voice.lang === lang);
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn(`No voice found for language: ${lang}`);
    }

    this.synth.speak(utterance);
  }
}

export default TextToSpeech.getInstance();