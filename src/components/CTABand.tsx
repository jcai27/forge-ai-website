import Button from "./Button";
import Reveal from "./Reveal";
import { discoveryCallHref } from "../config/site";

interface Props {
  title?: string;
  copy?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function CTABand({
  title = "Let's find out what your business could automate.",
  copy = "Tell us what's taking up your team's time. We'll help you explore a smarter way to get it done.",
  secondaryLabel = "Tell Us About Your Workflow",
  secondaryTo = "/contact",
}: Props) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-glow" aria-hidden="true" />
          <h2 className="h2">{title}</h2>
          <p className="lead">{copy}</p>
          <div className="btn-row center">
            <Button to={discoveryCallHref} arrow>Book a Discovery Call</Button>
            <Button to={secondaryTo} variant="secondary">{secondaryLabel}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
