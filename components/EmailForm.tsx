"use client";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, User, Smile, Phone, AtSign, Hourglass, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = "http://localhost:5000";

interface EmailFormProps {
  title: string;
  endDate?: string;
}

const countryPlaceholders: Record<string, string> = {
  "258": "841234567",
  "351": "912345678",
  "55": "11987654321",
  "27": "761915804",
  "44": "07123456789",
  "1": "5551234567",
  "357": "99123456",
  "60": "123456789",
  "49": "15123456789",
  "48": "501234567",
  "34": "612345678",
  "91": "9123456789",
};

const EmailForm = ({ title, endDate }: EmailFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "challenge">("phone");
  const [formData, setFormData] = useState({
    name: "",
    social: "",
    countryCode: "258",
    whatsapp: "",
    challenge: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getDaysLeft = () => {
    if (!endDate) return 0;
    const diff = new Date(endDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, whatsapp, countryCode } = formData;
    if (!name || !whatsapp) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const fullNumber = `${countryCode}${whatsapp.replace(/\D/g, "")}`;
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/otp/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullNumber, name }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("✅ OTP enviado para o WhatsApp!");
        setStep("otp");
      } else {
        toast.error(data.error || "Algo correu mal 😢");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar OTP 😢");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { countryCode, whatsapp, otp } = formData;
    if (!otp) {
      toast.error("Insira o código OTP!");
      return;
    }

    const fullNumber = `${countryCode}${whatsapp.replace(/\D/g, "")}`;
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/otp/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullNumber, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Código verificado com sucesso!");
        setStep("challenge"); // show challenge textbox now
      } else {
        toast.error(data.error || "Código inválido");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao verificar OTP 😢");
    } finally {
      setIsLoading(false);
    }
  };

  const sendChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, whatsapp, countryCode, challenge } = formData;
    if (!challenge) {
      toast.error("Por favor, escreve o desafio!");
      return;
    }

    const fullNumber = `${countryCode}${whatsapp.replace(/\D/g, "")}`;
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/otp/send-offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullNumber, name }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Mensagem de oferta enviada com sucesso!");
        setFormData({
          name: "",
          social: "",
          countryCode: "258",
          whatsapp: "",
          challenge: "",
          otp: "",
        });
        setStep("phone");
      } else {
        toast.error(data.error || "Erro ao enviar mensagem");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar mensagem 😢");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="p-6 space-y-8 flex flex-col justify-center bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-gray-200"
    >
      {endDate && (
        <div className="text-center">
          <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1">
            <Hourglass size={14} /> {getDaysLeft()} dias restantes
          </span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
        {title}
      </h1>

      {step === "phone" && (
        <form onSubmit={sendOtp} className="space-y-5">
          <div>
            <Label htmlFor="name">Nome</Label>
            <div className="relative">
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Denise Novele" className="pr-10"/>
              <User className="absolute right-3 top-2.5 text-gray-400" size={16}/>
            </div>
          </div>

          <div>
            <Label htmlFor="social">@ social</Label>
            <div className="relative">
              <Input type="text" name="social" value={formData.social} onChange={handleChange} placeholder="@danis.wh0" className="pr-10"/>
              <AtSign className="absolute right-3 top-2.5 text-gray-400" size={16}/>
            </div>
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <div className="flex gap-2 relative">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                {Object.keys(countryPlaceholders).map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
              <Input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder={countryPlaceholders[formData.countryCode]} className="flex-1 pr-10"/>
              <Phone className="absolute right-3 top-2.5 text-gray-400" size={16}/>
            </div>
          </div>

          <Button disabled={isPending || isLoading} type="submit" className="w-full py-6 text-base font-semibold relative overflow-hidden group">
            {isPending || isLoading ? <LoaderCircle className="animate-spin mx-auto" size={20}/> : "Receber OTP"}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <Label htmlFor="otp">Código OTP</Label>
          <Input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Ex: 123456" maxLength={6} className="text-center"/>
          <Button type="submit" disabled={isPending || isLoading} className="w-full py-6">
            {isPending || isLoading ? <LoaderCircle className="animate-spin mx-auto" size={20}/> : "Verificar OTP"}
          </Button>
        </form>
      )}

      {step === "challenge" && (
        <form onSubmit={sendChallenge} className="space-y-4">
          <Label htmlFor="challenge">Conta-nos um desafio</Label>
          <div className="relative">
            <textarea name="challenge" value={formData.challenge} onChange={handleChange} placeholder="Partilha um desafio que encontraste ou estás a enfrentar no acesso ao ensino superior..." className="w-full min-h-[120px] resize-none border rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            <Lightbulb className="absolute right-3 top-3 text-gray-400" size={18}/>
          </div>
          <Button type="submit" disabled={isPending || isLoading} className="w-full py-6">
            {isPending || isLoading ? <LoaderCircle className="animate-spin mx-auto" size={20}/> : "Enviar"}
          </Button>
        </form>
      )}

      <div className="text-center text-sm text-gray-400 mt-2 flex items-center justify-center gap-1">
        <Smile size={14}/> Mal podemos esperar por te ajudar!
      </div>
    </motion.div>
  );
};

export default EmailForm;
