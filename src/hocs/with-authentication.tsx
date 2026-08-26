// Higher ORder Component
// É um componente que recebe um componente e o renderiza
// mas antes de renderizá-lo, executa alguma ação
// ou, passa alguma prop extra pra esse componente

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const WithAuthentication = async ({
  children,
  mustHavePlan = false,
  mustHaveClinic = false,
}: {
  children: React.ReactNode;
  mustHavePlan?: boolean;
  mustHaveClinic?: boolean;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  // Gate de plano (Stripe) desativado localmente — sem integração de pagamento
  // por enquanto. Para reativar, descomente o bloco abaixo.
  // if (mustHavePlan && !session.user.plan) {
  //   redirect("/new-subscription");
  // }
  void mustHavePlan;
  if (mustHaveClinic && !session.user.clinic) {
    redirect("/clinic-form");
  }
  return children;
};

export default WithAuthentication;
