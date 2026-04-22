import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Anima um valor numérico contido numa string (ex: "+1000", "98%", "24/7", "+10").
 * Preserva prefixos/sufixos não numéricos. Se não houver número, devolve a string original.
 */
export const CountUp = ({ value, duration = 3500, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // Extrai o primeiro número da string
  const match = value.match(/(\d+(?:\.\d+)?)/);
  const target = match ? parseFloat(match[1]) : null;
  const prefix = match ? value.slice(0, match.index!) : "";
  const suffix = match ? value.slice(match.index! + match[0].length) : "";

  useEffect(() => {
    if (target === null) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        const formatted = Number.isInteger(target)
          ? Math.round(current).toString()
          : current.toFixed(1);
        setDisplay(`${prefix}${formatted}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    // Inicia imediatamente caso já esteja visível no carregamento
    setDisplay(`${prefix}0${suffix}`);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};