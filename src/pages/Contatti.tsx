import { useState, type FormEvent } from 'react';
import { Clock, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import usePageMeta from '../hooks/usePageMeta';
import Eyebrow from '../components/ui/Eyebrow';
import { immagini, servizi, studio, team } from '../data/site';

export default function Contatti() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servizio, setServizio] = useState('');
  const [messaggio, setMessaggio] = useState('');

  usePageMeta(
    'Contatti — FisioEVA | Via di Boccea 755, Roma',
    'Prenota una visita allo studio FisioEVA in Via di Boccea 755, Roma Casalotti. Telefono, email, orari e mappa per raggiungerci.'
  );

  /**
   * There is no backend yet: the form composes an email in the visitor's own
   * client so nothing gets silently lost.
   */
  const inviaEmail = (e: FormEvent) => {
    e.preventDefault();

    const corpo = [
      `Nome: ${nome}`,
      `Email: ${email}`,
      telefono && `Telefono: ${telefono}`,
      servizio && `Trattamento di interesse: ${servizio}`,
      '',
      messaggio,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(
      `Richiesta appuntamento — ${nome || 'Sito FisioEVA'}`
    )}&body=${encodeURIComponent(corpo)}`;
  };

  /* `text-base` non è un vezzo: sotto i 16px Safari su iPhone ingrandisce la
     pagina appena tocchi il campo, e da lì in poi il modulo esce dallo schermo. */
  const inputClass =
    'w-full min-h-12 bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-base text-brand-dark placeholder:text-gray-500 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors';

  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title={
          <>
            Prenota la tua <span className="text-brand-primary">visita</span>
          </>
        }
        subtitle="Siamo in Via di Boccea 755, a Roma. Scrivici o chiamaci: ti richiamiamo per fissare insieme il primo appuntamento."
        breadcrumb="Contatti"
        image={immagini.sede}
      />

      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow align="left" className="mb-5">
              Dove trovarci
            </Eyebrow>

            <h2 className="text-h2 mb-8 text-center font-sans font-bold text-brand-dark lg:text-left">
              A due passi <span className="text-brand-primary-ink">da te</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md sm:gap-5 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary-ink">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">Indirizzo</p>
                  <p className="text-lead font-sans font-bold text-brand-dark">{studio.address}</p>
                  <p className="font-light text-gray-600">
                    {studio.city} ({studio.zone})
                  </p>
                </div>
              </div>

              {team
                .filter((m) => m.phone)
                .map((membro) => (
                  <a
                    key={membro.slug}
                    href={membro.phoneHref}
                    className="group flex items-center gap-4 rounded-[2rem] border border-white bg-white/80 p-5 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl sm:gap-5 sm:p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-secondary/10 text-brand-secondary-ink transition-transform duration-300 group-hover:scale-110">
                      <Phone className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">
                        {membro.name}
                      </p>
                      <p className="font-sans font-medium text-brand-dark transition-colors group-hover:text-brand-secondary-ink">
                        {membro.phone}
                      </p>
                    </div>
                  </a>
                ))}

              <a
                href={`mailto:${studio.email}`}
                className="group flex items-center gap-4 rounded-[2rem] border border-white bg-white/80 p-5 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl sm:gap-5 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary-ink transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">Email</p>
                  <p className="font-sans font-medium break-all text-brand-dark transition-colors group-hover:text-brand-secondary-ink">
                    {studio.email}
                  </p>
                </div>
              </a>

              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[2rem] border border-white bg-white/80 p-5 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl sm:gap-5 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-secondary/10 text-brand-secondary-ink transition-transform duration-300 group-hover:scale-110">
                  <Instagram className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">Instagram</p>
                  <p className="font-sans font-medium text-brand-dark transition-colors group-hover:text-brand-secondary-ink">
                    @{studio.instagram}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md sm:gap-5 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary-ink">
                  <Clock className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <p className="mb-3 text-xs tracking-wider text-gray-600 uppercase">Orari</p>
                  <ul className="space-y-2">
                    {studio.orari.map((o) => (
                      <li key={o.giorno} className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-600 font-light">{o.giorno}</span>
                        <span className="text-brand-dark font-medium whitespace-nowrap">
                          {o.ore}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-brand-dark p-6 shadow-2xl sm:p-8 md:rounded-[2.5rem] md:p-10">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[120%] rounded-full bg-brand-primary/20 blur-[100px]"></div>
              </div>

              <div className="relative z-10">
                <Eyebrow align="left" tone="light" className="mb-5">
                  Scrivici
                </Eyebrow>

                <h2 className="text-h2 mb-3 text-center font-sans font-light text-white lg:text-left">
                  Raccontaci <span className="font-medium text-brand-primary">cosa ti succede</span>
                </h2>
                <p className="mb-8 text-center text-sm leading-relaxed font-light text-gray-300 lg:text-left">
                  Compila i campi: si aprirà il tuo programma di posta con il messaggio già pronto da
                  inviare.
                </p>

                <form onSubmit={inviaEmail} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome e cognome *"
                      aria-label="Nome e cognome"
                      className={inputClass}
                    />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email *"
                      aria-label="Email"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Telefono"
                      aria-label="Telefono"
                      className={inputClass}
                    />
                    <select
                      value={servizio}
                      onChange={(e) => setServizio(e.target.value)}
                      aria-label="Trattamento di interesse"
                      className={`${inputClass} ${servizio ? 'text-brand-dark' : 'text-gray-400'}`}
                    >
                      <option value="">Trattamento di interesse</option>
                      {servizi.map((s) => (
                        <option key={s.slug} value={s.titolo}>
                          {s.titolo}
                        </option>
                      ))}
                      <option value="Non lo so ancora">Non lo so ancora</option>
                    </select>
                  </div>

                  <textarea
                    required
                    rows={5}
                    value={messaggio}
                    onChange={(e) => setMessaggio(e.target.value)}
                    placeholder="Raccontaci il tuo problema, da quanto tempo lo hai e cosa vorresti tornare a fare *"
                    aria-label="Messaggio"
                    className={`${inputClass} resize-none`}
                  />

                  <button
                    type="submit"
                    className="group flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-brand-primary px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-brand-dark"
                  >
                    <span>Invia la richiesta</span>
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="pt-1 text-xs leading-relaxed font-light text-gray-400">
                    Inviando la richiesta acconsenti al trattamento dei tuoi dati per essere
                    ricontattato. Non li usiamo per nient'altro.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="relative">
        <iframe
          title="Mappa — FisioEVA, Via di Boccea 755, Roma"
          src={`https://www.google.com/maps?q=${studio.mapsQuery}&output=embed`}
          className="block h-[320px] w-full border-0 grayscale-[30%] sm:h-[420px] md:h-[520px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </section>
    </>
  );
}
