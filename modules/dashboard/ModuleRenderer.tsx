"use client";

import Home from "@/modules/services/home";
import { SERVICES } from "@/shared/constants/services";

type ModuleRendererProps = {
  activeService: string;
};

const MODULE_REGISTRY: Record<string, React.ComponentType> = {
  [SERVICES.HOME]: Home,
};

function ComingSoon() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        Module Not Implemented
      </h2>

      <p>This service is under development.</p>
    </div>
  );
}

export default function ModuleRenderer({
  activeService,
}: ModuleRendererProps) {

  const Component =
    MODULE_REGISTRY[activeService] ??
    ComingSoon;

  return <Component />;

}