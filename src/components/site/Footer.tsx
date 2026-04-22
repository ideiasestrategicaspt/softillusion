import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import logo from "@/assets/softillusion-logo.png";
import { COMPANY } from "@/lib/constants";

export const Footer = () => {
  const ano = new Date().getFullYear();
  return (
    <footer id="contactos" className="bg-ink text-white pt-20 pb-8">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <img src={logo} alt="Logótipo Softillusion" className="h-14 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-white/65 leading-relaxed">
              Desentupimentos e aspiração industrial 24h. {COMPANY.serviceArea}.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.instagram.com/sos.softillusion/" target="_blank" rel="noopener" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04C2.7 8.5 2.7 8.85 2.7 12s0 3.5.06 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 0 0-.82-1.26 3.4 3.4 0 0 0-1.26-.82c-.39-.15-.97-.33-2.04-.38C15.5 4 15.15 4 12 4Zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9Zm0 8.16a3.21 3.21 0 1 0 0-6.42 3.21 3.21 0 0 0 0 6.42Zm6.3-8.36a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61575592600999" target="_blank" rel="noopener" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M13.5 22v-8h2.7l.4-3.13H13.5V8.87c0-.9.25-1.52 1.55-1.52h1.66V4.55c-.29-.04-1.27-.13-2.42-.13-2.4 0-4.04 1.46-4.04 4.15v2.31H7.5V14h2.75v8h3.25Z"/>
                </svg>
              </a>
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
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {ano} {COMPANY.name} — {COMPANY.tagline}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};