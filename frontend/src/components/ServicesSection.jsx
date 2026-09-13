import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';
import './servicesSection.css';

const information = [
  {
    title: 'Our Services', subtitle: 'Covers A Wide Range', tone: 'charcoal',
    description: 'We include all the research related services for PhD students to provide them a single stop for their PhD research and research publication needs.',
  },
  {
    title: 'Our Experts', subtitle: 'Subject Specific Precision', tone: 'grey',
    description: 'To serve different services and one client at a time, we have a team of 790+ experts including subject specialist consultants, writers, editors, analysts, statisticians, developers and programmers.',
  },
  {
    title: 'Our Guarantee', subtitle: 'Effective & Efficient', tone: 'orange',
    description: 'We guarantee quality and time preservation in our services. Moreover, we maintain an interactive service process with our clients to keep the service satisfactory.',
  },
];

// Row-first order stays consistent visually and for screen readers at every width.


function ServiceCard({ service, index }) {
  const { title, path, description, icon: ServiceIcon, wordmark } = service;
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const text = textRef.current;
    const layer = text.parentElement;
    // Fit the complete copy without truncating it or changing the card geometry.
    const fit = () => {
      const styles = getComputedStyle(layer);
      const available = layer.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      let size = 12;
      text.style.fontSize = `${size}px`;
      while (text.getBoundingClientRect().height > available && size > 1) {
        size -= 0.25;
        text.style.fontSize = `${size}px`;
      }
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(layer);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) fit(); });
    return () => { disposed = true; observer.disconnect(); };
  }, [description]);

  return (
    <li>
      <Link
        to={path}
        className="research-services__card"
        aria-label={`View ${title} service`}
        aria-describedby={`service-description-${index}`}
      >
        <span className="research-services__front" aria-hidden="true">
          <span className="research-services__icon">
            {ServiceIcon ? <ServiceIcon size={30} strokeWidth={1.6} /> : <span className="research-services__wordmark">{wordmark}</span>}
          </span>
          <span>{title}</span>
        </span>
        <span className="research-services__description" id={`service-description-${index}`}>
          <span ref={textRef}>{description}</span>
        </span>
      </Link>
    </li>
  );
}

export default function ServicesSection() {
  return (
    <section className="research-services" id="services" aria-labelledby="our-services-title">
      <div className="research-services__layout">
        <div className="research-services__information">
          {information.map(({ title, subtitle, description, tone }, index) => (
            <div className={`research-services__panel research-services__panel--${tone}`} key={title}>
              <h2 id={index === 0 ? 'our-services-title' : undefined}>{title}</h2>
              <h3>{subtitle}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <ul className="research-services__grid" aria-label="Research services">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
