import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  UserCheck, 
  Lock, 
  AlertCircle 
} from 'lucide-react';

export default function LoginModal({ isOpen, onLoginSuccess }) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [role, setRole] = useState('trainee');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setStep('otp');
      setTimer(30);
      setCanResend(false);
    }
  };

  const handleOtpInput = (index, value) => {
    const val = value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePasteOtp = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const newOtp = [...otp];
    pasted.forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char;
    });
    setOtp(newOtp);
  };

  const isOtpComplete = otp.every(digit => digit.length === 1);

  const handleVerify = () => {
    if (isOtpComplete) {
      setStep('success');
      setTimeout(() => {
        onLoginSuccess({ phone, role });
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl transition-all duration-300">
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-violet-600/20 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-800 relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20 mb-1">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Cpu className="w-7 h-7 text-indigo-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
              KaushalSetu
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
              SIH26134
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Maharashtra Labour Market Intelligence & Skill Alignment Portal
          </p>
        </div>

        {/* Step 1: Phone & Role */}
        {step === 'phone' && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Portal Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('trainee')}
                  className={`px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    role === 'trainee'
                      ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-sm'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Trainee
                </button>
                <button
                  type="button"
                  onClick={() => setRole('policy')}
                  className={`px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    role === 'policy'
                      ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-sm'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Policy Officer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    role === 'recruiter'
                      ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-sm'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Recruiter
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Mobile Number</label>
              <div className="flex rounded-xl border border-slate-700 bg-slate-950 overflow-hidden focus-within:border-indigo-500 transition-all">
                <span className="bg-slate-900 px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-400 border-r border-slate-800 flex items-center">
                  +91
                </span>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono tracking-wider"
                />
              </div>
            </div>

            <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/30 text-indigo-200 text-xs flex items-center space-x-2">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span><strong>Demo Instructions:</strong> Enter any mobile number (e.g. 9876543210).</span>
            </div>

            <button 
              onClick={handleSendOtp}
              disabled={phone.length !== 10}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Send Verification OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-base font-bold text-white">Enter OTP Verification Code</h2>
              <p className="text-xs text-slate-400 mt-0.5">OTP code sent to +91 {phone}</p>
            </div>

            {/* OTP Demo Banner */}
            <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Demo OTP Code: <span className="font-mono text-emerald-200 font-extrabold text-sm ml-1 tracking-widest">1 2 3 4 5 6</span> (or any 6 digits)</span>
            </div>

            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInput(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handlePasteOtp}
                  className="w-12 h-12 text-center text-lg font-bold font-mono text-white bg-slate-950 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{timer > 0 ? `Resend OTP in 00:${timer < 10 ? '0' + timer : timer}` : "Didn't receive code?"}</span>
              <button 
                disabled={!canResend}
                onClick={() => { setTimer(30); setCanResend(false); }}
                className="text-indigo-400 hover:underline disabled:opacity-40 disabled:no-underline font-medium"
              >
                Resend Code
              </button>
            </div>

            <button 
              onClick={handleVerify}
              disabled={!isOtpComplete}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Verify & Unlock Dashboard</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setStep('phone')} 
              className="w-full py-1 text-xs text-slate-400 hover:text-white transition-all text-center"
            >
              ← Change phone number
            </button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
              ✓
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Authentication Verified!</h2>
              <p className="text-xs text-slate-400 mt-1">Unlocking KaushalSetu Intelligence Dashboard...</p>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full w-full animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
          Department of Skills, Employment, Entrepreneurship & Innovation • Govt of Maharashtra
        </div>

      </div>
    </div>
  );
}
