import { useEffect, useState } from "react";

function AccessDenied() {
  return (
    <section className="panel error-panel">
      <h2>Lab terminal</h2>
      <p>ACCESS REQUIRED. Панель терминала недоступна.</p>
    </section>
  );
}

export function LabTerminal({ accessGranted }) {
  if (!accessGranted) {
    return <AccessDenied />;
  }

  const [status, setStatus] = useState("loading");
  const [operator, setOperator] = useState("unknown");
  useEffect(() => {
    setStatus("online");
    setOperator("DUSTIN");
  }, []);

  return (
    <section className="panel terminal-panel">
      <h2>Lab terminal</h2>
      <p>Status: {status}</p>
      <p>Operator: {operator}</p>
      <p>Диагностика активна. Проверьте восстановление сигнала ниже.</p>
    </section>
  );
}
