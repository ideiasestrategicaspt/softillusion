import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import logo from "@/assets/softillusion-logo.png";
import { COMPANY } from "@/lib/constants";

export const Footer = () => {
  const ano = new Date().getFullYear();
  return (
    <footer id="contactos" className="bg-ink text-white pt-20 pb-8">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="Logótipo Softillusion" className="h-14 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-white/65 leading-relaxed">
              Desentupimentos e aspiração industrial 24h. {COMPANY.serviceArea}.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors text-xs font-bold">IG</a>
              <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors text-xs font-bold">FB</a>
              <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors text-xs font-bold">in</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-light mb-4">
              Contactos 24h
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-white hover:text-brand-light">
                  <Phone className="h-4 w-4 text-brand-light" />
                  <span className="font-bold">{COMPANY.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 text-white/80 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-brand-light" />
                  WhatsApp directo
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-white/80 hover:text-white break-all">
                  <Mail className="h-4 w-4 text-brand-light shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/65">
                <MapPin className="h-4 w-4 text-brand-light shrink-0 mt-0.5" />
                {COMPANY.serviceArea}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-light mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#servicos" className="hover:text-white">Serviços</a></li>
              <li><a href="#cobertura" className="hover:text-white">Área de cobertura</a></li>
              <li><a href="#testemunhos" className="hover:text-white">Testemunhos</a></li>
              <li><a href="#orcamento" className="hover:text-white">Pedir orçamento</a></li>
              <li><a href="/area-cliente" className="hover:text-white">Área de cliente</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-light mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos e Condições</a></li>
              <li><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener" className="hover:text-white">Livro de Reclamações</a></li>
              <li><a href="#" className="hover:text-white">Resolução Alternativa de Litígios</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {ano} {COMPANY.name} — {COMPANY.tagline}. Todos os direitos reservados.</p>
          <p>NIF: [a definir]</p>
        </div>
      </div>
    </footer>
  );
};