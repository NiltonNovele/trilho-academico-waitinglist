"use client";
import React, { useTransition, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
Hourglass,
LoaderCircle,
Mail,
User,
Lightbulb,
Sparkles,
Smile,
} from "lucide-react";
import { motion } from "framer-motion";

const EmailForm = ({ date, title }: { date: string; title: string }) => {
const [isPending, startTransaction] = useTransition();
const [isLoading, setIsLoading] = useState(false);
const [progress, setProgress] = useState(0);
const [formData, setFormData] = useState({
name: "",
email: "",
text: "",
});

const getDaysLeft = (): number => {
const endDate = new Date(date);
const today = new Date();
const diffTime = endDate.getTime() - today.getTime();
return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

useEffect(() => {
const filledFields = Object.values(formData).filter(Boolean).length;
setProgress((filledFields / 3) * 100);
}, [formData]);

const handleInputChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (event: React.SyntheticEvent) => {
event.preventDefault();
const form = event.target as HTMLFormElement;


const { name, email } = formData;
if (!email || !name) {
  toast.error("Por favor, preencha todos os campos! 😅");
  return;
}

startTransaction(async () => {
  setIsLoading(true);
  try {
    const res = await fetch("https://formspree.io/f/mdknweok", {
      method: "POST",
      body: new FormData(form),
    });

    if (res.ok) {
      toast.success("🎉 Obrigado por te inscreveres!");
      setFormData({ name: "", email: "", text: "" });
    } else {
      toast.error("Algo correu mal 😢");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast.success("🎉 Obrigado por te inscreveres!");
  } finally {
    setIsLoading(false);
  }
});

};

return (
<motion.div
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
className="p-6 space-y-8 flex flex-col justify-center bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-gray-200"
> <div className="space-y-4 text-center"> <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 mx-auto"> <Hourglass size={14} />
{getDaysLeft()} dias restantes </span>

    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
      <Sparkles className="text-yellow-500 animate-pulse" size={20} />
      {title}
    </h1>
    <p className="text-gray-500 text-sm">
      Junta-te à lista de espera e ganha um desconto de 50% 🚀
    </p>
  </div>

  {/* Progress bar */}
  <div className="relative w-full bg-gray-100 h-2 rounded-full overflow-hidden">
    <motion.div
      className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.4 }}
    />
  </div>

  <form
    onSubmit={handleSubmit}
    action="https://formspree.io/f/mdknweok"
    method="POST"
    className="space-y-5"
  >
    {/* Nome */}
    <div>
      <Label htmlFor="name">Nome Completo</Label>
      <div className="relative">
        <Input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Denise Novele"
          className="pr-10"
        />
        <User className="absolute right-3 top-2.5 text-gray-400" size={16} />
      </div>
    </div>

    {/* Email */}
    <div>
      <Label htmlFor="email">E-mail</Label>
      <div className="relative">
        <Input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder="denise.novele@exemplo.com"
          className="pr-10"
        />
        <Mail className="absolute right-3 top-2.5 text-gray-400" size={16} />
      </div>
    </div>

    {/* Desafio (Textarea) */}
    <div>
      <Label htmlFor="text">Conte-nos:</Label>
      <div className="relative">
        <textarea
          name="text"
          id="text"
          required
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Partilha um desafio que encontraste no acesso ao ensino superior..."
          className="w-full min-h-[120px] resize-none border rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Lightbulb
          className="absolute right-3 top-3 text-gray-400"
          size={18}
        />
      </div>
    </div>

    <Button
      disabled={isPending || isLoading}
      type="submit"
      className="w-full py-6 text-base font-semibold relative overflow-hidden group"
    >
      <span
        className={`transition-all ${
          isPending || isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        Entrar na lista de espera
      </span>
      {(isPending || isLoading) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={20} />
        </div>
      )}
    </Button>
  </form>

  <div className="text-center text-sm text-gray-400 mt-2 flex items-center justify-center gap-1">
    <Smile size={14} />
    Mal podemos esperar por poder te ajudar!
  </div>
</motion.div>

);
};

export default EmailForm;
