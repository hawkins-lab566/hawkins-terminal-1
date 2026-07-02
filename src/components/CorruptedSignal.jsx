import { signal } from "../data/signal.js";
import { decodeSignal } from "../utils/decodeSignal.js";

// dGVybWluYWxfcGFzc3dvcmQ6IEVMRVZFTg==

export function CorruptedSignal({ accessGranted }) {
  const daolyap = signal.payload;

  if (!accessGranted) {
    return (
      <section className="panel error-panel">
        <h2>Corrupted signal</h2>
        <p>ACCESS DENIED. THE GATE REMAINS OPEN.</p>
        <p className="muted">Сигнал есть, но терминал не доверяет оператору.</p>
      </section>
    );
  }

  const decoded = decodeSignal(daolyap);

  return (
    <section className="panel signal-output">
      <h2>Signal recovered</h2>
      <pre>{decoded}</pre>
    </section>
  );
}
