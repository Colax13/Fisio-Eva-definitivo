import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Clock, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import usePageMeta from '../hooks/usePageMeta';
import ArrowButton from '../components/ui/ArrowButton';
import { immagini, servizi, studio, team } from '../data/site';

/** Stessa destinazione del riquadro "Dove siamo" in home. */
const MAPS_ESTERNA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${studio.address}, ${studio.city}`
)}`;

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

  /*
   * `name` e `autoComplete` non sono formalita': senza, il telefono non
   * propone nome, mail e numero gia' salvati, e su una tastiera piccola
   * riscriverli a mano e' la ragione piu' comune per cui un modulo di contatto
   * viene abbandonato a meta'.
   */
  const inputClass =
    'w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors';

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

      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-brand-primary-chiaro text-xs tracking-widest uppercase font-medium">
                Dove trovarci
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark leading-tight mb-10">
              A due passi <span className="text-brand-primary">da te</span>
            </h2>

            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5">
                <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Indirizzo</p>
                  <p className="font-sans font-bold text-brand-dark text-lg">{studio.address}</p>
                  <p className="text-gray-600 font-light">
                    {studio.city} ({studio.zone})
                  </p>
                </div>
              </div>

              {/* Il numero dello studio, non i cellulari delle professioniste:
                  quelli stanno sui biglietti da visita. */}
              <a
                href={studio.phoneHref}
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telefono</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">
                    {studio.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${studio.email}`}
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors break-all">
                    {studio.email}
                  </p>
                </div>
              </a>

              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Instagram</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">
                    @{studio.instagram}
                  </p>
                </div>
              </a>

              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5">
                <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Orari</p>
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
            <div className="bg-brand-dark rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[120%] rounded-full bg-brand-primary/20 blur-[100px]"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-brand-primary-chiaro text-xs tracking-widest uppercase font-medium">
                    Scrivici
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-sans font-light text-white leading-tight mb-3">
                  Raccontaci <span className="text-brand-primary font-medium">cosa ti succede</span>
                </h2>
                <p className="mb-8 text-sm leading-relaxed font-light text-gray-300">
                  Compila i campi: si aprirà il tuo programma di posta con il messaggio già pronto da
                  inviare.
                </p>

                <form onSubmit={inviaEmail} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      name="nome"
                      autoComplete="name"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome e cognome *"
                      aria-label="Nome e cognome"
                      className={inputClass}
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
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
                      name="telefono"
                      autoComplete="tel"
                      inputMode="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Telefono"
                      aria-label="Telefono"
                      className={inputClass}
                    />
                    <select
                      name="servizio"
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
                    name="messaggio"
                    rows={5}
                    value={messaggio}
                    onChange={(e) => setMessaggio(e.target.value)}
                    placeholder="Raccontaci il tuo problema, da quanto tempo lo hai e cosa vorresti tornare a fare *"
                    aria-label="Messaggio"
                    className={`${inputClass} resize-none`}
                  />

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-3 bg-brand-primary text-white hover:bg-white hover:text-brand-dark rounded-full px-8 py-4 transition-colors duration-300 font-medium text-sm"
                  >
                    <span>Invia la richiesta</span>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="pt-1 text-xs leading-relaxed font-light text-gray-300">
                    Inviando la richiesta acconsenti al trattamento dei tuoi dati per essere
                    ricontattato. Non li usiamo per nient'altro.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mappa */}
      <MappaSuRichiesta />
    </>
  );
}

/**
 * La mappa, ma solo se la si chiede.
 *
 * L'iframe di Google partiva da solo al caricamento della pagina. Vuol dire
 * che Google riceveva l'indirizzo IP di ogni visitatore e piazzava i suoi
 * cookie prima che qualcuno avesse acconsentito a niente — e il banner di
 * consenso su questo sito non c'e' ancora. La sezione "Dove siamo" in home
 * aveva gia' preso la strada giusta, con un semplice link; qui la pagina
 * faceva il contrario, nella stessa visita.
 *
 * Cosi' si tiene la mappa dov'e' utile — nella pagina dei contatti — e la si
 * carica al primo clic. Chi vuole solo l'indirizzo lo legge sopra e non paga
 * niente; chi vuole la mappa la apre e sa di averla aperta.
 */
function MappaSuRichiesta() {
  const [caricata, setCaricata] = useState(false);

  return (
    <section className="relative" aria-label="Mappa dello studio">
      {caricata ? (
        <iframe
          title="Mappa — FisioEVA, Via di Boccea 755, Roma"
          src={`https://www.google.com/maps?q=${studio.mapsQuery}&output=embed`}
          className="h-[420px] w-full border-0 grayscale-[30%] md:h-[520px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="relative flex h-[420px] w-full flex-col items-center justify-center gap-5 overflow-hidden bg-brand-dark px-6 text-center md:h-[520px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-[30%] -left-[10%] h-[120%] w-[55%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
            <div className="absolute -right-[10%] -bottom-[30%] h-[120%] w-[55%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
          </div>

          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-brand-primary">
            <MapPin className="h-7 w-7" />
          </span>

          <div className="relative">
            <p className="font-sans text-xl font-bold text-white">
              {studio.address} — {studio.city}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed font-light text-gray-300">
              La mappa arriva da Google e, per mostrarla, il tuo browser deve
              contattare i loro server. La carichiamo solo se ce lo chiedi.
            </p>
          </div>

          <div className="relative flex w-full max-w-md flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <ArrowButton onClick={() => setCaricata(true)} variant="ghost" icon={MapPin}>
              Carica la mappa
            </ArrowButton>
            <ArrowButton href={MAPS_ESTERNA} variant="ghostSecondary" icon={ArrowUpRight}>
              Aprila su Google Maps
            </ArrowButton>
          </div>
        </div>
      )}
    </section>
  );
}
