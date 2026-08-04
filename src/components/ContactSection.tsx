import { Mail, MapPin, Phone, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

const contacts = [
  {
    icon: Phone,
    label: 'Dott.ssa Azzurra De Angelis',
    value: '+39 380 364 0807',
    href: 'tel:+393803640807',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
  },
  {
    icon: Phone,
    label: 'Dott.ssa Elisa De Rubeis',
    value: '+39 333 874 5324',
    href: 'tel:+393338745324',
    color: 'text-brand-secondary',
    bg: 'bg-brand-secondary/10',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'fisioeva.boccia@gmail.com',
    href: 'mailto:fisioeva.boccia@gmail.com',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@fisioeva_boccea',
    href: 'https://www.instagram.com/fisioeva_boccea',
    color: 'text-brand-secondary',
    bg: 'bg-brand-secondary/10',
  },
];

export default function ContactSection() {
  return (
    <section id="contatti" className="relative bg-brand-light py-24 px-6 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">Contatti</span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark leading-tight">
            Vieni a trovarci, <span className="text-brand-primary">ti aspettiamo</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border border-white flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dove siamo</p>
                <p className="font-sans font-bold text-brand-dark text-lg">Via di Boccea, 755</p>
                <p className="text-gray-600 font-light">00166 Roma (Casalotti)</p>
              </div>
            </div>

            {contacts.map((contact, idx) => (
              <a
                key={idx}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${contact.bg} flex items-center justify-center ${contact.color} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <contact.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{contact.label}</p>
                  <p className="font-sans font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">{contact.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white min-h-[400px]"
          >
            <iframe
              title="Mappa FisioEVA — Via di Boccea 755, Roma"
              src="https://www.google.com/maps?q=Via+di+Boccea+755,+00166+Roma&output=embed"
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
