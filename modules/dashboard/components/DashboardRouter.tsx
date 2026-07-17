"use client";

import React from "react";
import { MODULE_REGISTRY } from "@/platform/configuration/module-registry";

interface DashboardRouterProps {
  activeModule: string;
}

const DashboardRouter: React.FC<DashboardRouterProps> = ({
  activeModule,
}) => {
  const moduleDefinition = MODULE_REGISTRY[activeModule];

  if (!moduleDefinition) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Module Not Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            No module has been registered for
            <span className="font-medium"> {activeModule}</span>.
          </p>
        </div>
      </div>
    );
  }

  const Component = moduleDefinition.component;

  return <Component />;
};

export default DashboardRouter;