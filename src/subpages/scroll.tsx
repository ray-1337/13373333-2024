import style from "@/styles/animations/scroll.module.css";

export default function ScrollIndicator(props: { active: boolean }) {
  return (
    <section className={style.scroll} data-show={props?.active || false}>
      <p>scroll</p>
      <span className={style.indicator}/>
    </section>
  );
};