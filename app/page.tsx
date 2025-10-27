import Card from "@/components/Card";
import CardHeader from "@/components/Offer";
import EmailForm from "@/components/EmailForm";

export default function Home() {
  const siteLogo = "/logo-nv.png";
  // Data from env
  const features = "Seleciona o Curso Perfeito, Teste Vocacional, Bolsas de Estudo, Suporte Personalizado";
  const price = "200";
  const discountPrice = "100";
  const date = "2025-11-01";
  const title =
    "Entre na lista de espera do Trilho Académico.";
  const description = "Desconto exclusivo de 50% no lançamento para membros da lista de espera, valido por um mês.";

  console.log(price);
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteLogo}
        alt="logo"
        className="w-auto h-20 mx-auto object-contain mb-5"
      />
      <Card>
        <div className="grid md:grid-cols-2 md:divide-x divide-[#F0E4D2]">
          <div className="md:order-1 order-2">
            <CardHeader
              title={description}
              features={features}
              price={price}
              discount={discountPrice}
            />
          </div>
          <div className="md:order-2 order-1">
            <EmailForm date={date} title={title} />
          </div>
        </div>

        {/* <CardFooter /> */}

        {/* element */}
        <span className="w-2 h-2 absolute z-10 -top-[1%] -left-[0.5%] block bg-white border border-[#F0E4D2]"></span>
        <span className="w-2 h-2 absolute z-10 -bottom-[1%] -left-[0.5%] block bg-white border border-[#F0E4D2]"></span>
        <span className="w-2 h-2 absolute z-10 -top-[1%] -right-[0.5%] block bg-white border border-[#F0E4D2]"></span>
        <span className="w-2 h-2 absolute z-10 -bottom-[1%] -right-[0.5%] block bg-white border border-[#F0E4D2]"></span>
      </Card>
    </div>
  );
}
