import { stripIndents, safeHtml } from "common-tags";
import { useState, createContext } from "react";
import { IconMail } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import style from "@/styles/pages/index.module.css";

// work pieces
import WorkPieces from "@/subpages/work";

// introduction
const introduction: string = stripIndents(`
  i am an independent full-stack developer.

  i am currently focusing on mastering video editing and animation.
`);

// clickable
const clickableList: Array<Record<"name" | "value", string> & { isURL?: boolean }> = [
  { name: "work", value: "work" }
];

// social media
const sosmedList: Array<{ icon: string | typeof IconMail, url: string }> = [
  { icon: "github", url: "https://github.com/ray-1337" },
  { icon: "instagram", url: "https://instagram.com/ray__1337" },
  { icon: IconMail, url: "mailto:personal@13373333.one" }
];

export const SetSectionChosenContext = createContext(null);

export default function Main() {
  const [sectionChosen, setSectionChosen] = useState<string | null>(null);
  const [debouncedSectionChosen] = useDebouncedValue(sectionChosen, 850);
  const [quickerDebouncedSectionChosenForProps] = useDebouncedValue(sectionChosen, 500);
  const [debouncedSectionChosenForProps] = useDebouncedValue(sectionChosen, 900);

  return (
    // @ts-expect-error
    <SetSectionChosenContext.Provider value={setSectionChosen}>
      {/* main/frontpage */}
      <section className={style.frontpage}>
        {/* frontpage section */}
        <section className={style.frontier}>
          {/* introduction section */}
          <div className={style.intro}>
            <div className={style.skrillex}> { /* running out of classname */ }
              <div className={style.text}>
                <p dangerouslySetInnerHTML={{
                  __html: safeHtml(`hi. i am <b>ray</b>. ` + introduction.split(/[\r\n]/gim).join("<br/>"))
                }} />
              </div>

              {/* clickable stuff */}
              <div className={style.clickable}>
                {
                  clickableList.map((val, index) => {
                    return (
                      <span onClick={() => !val?.isURL ? setSectionChosen(val.value) : undefined} key={index} data-hoverable-effect-1={true}>
                        <u>
                          {/* if its url, use "anchor instead" */}
                          {val?.isURL && <a href={val.value}>{val.name}</a>}

                          {/* otherwise, normal text is fine */}
                          {!val?.isURL && <p>{val.name}</p>}
                        </u>
                      </span>
                    );
                  })
                }
              </div>
            </div>

            {/* clickable stuff, but with icon */}
            <div className={style.icon}>
              {
                sosmedList.map((val, index) => {
                  return (
                    <span key={index}>
                      <a href={val.url} target={"_blank"}>
                        {
                          typeof val.icon === "string" ? (
                            <img src={`https://cdn.simpleicons.org/${val.icon}/black`} alt={val.icon} loading={"eager"}/>
                          ) : (
                            <val.icon/>
                          )
                        }
                      </a>
                    </span>
                  );
                })
              }
            </div>
          </div>

          {/* empty rectangle section */}
          <div
            className={style.rectangle}
            data-transition-woop={sectionChosen !== null ? sectionChosen !== null : quickerDebouncedSectionChosenForProps !== null}
            // data-transition-hidden={sectionChosen !== null ? debouncedSectionChosenForProps !== null : debouncedSectionChosen !== null}
          />
        </section>
      </section>

      {/* work pieces */}
      {
        debouncedSectionChosen === "work" && (
          <WorkPieces active={sectionChosen === "work" ? debouncedSectionChosenForProps === "work" : false}/>
        )
      }
    </SetSectionChosenContext.Provider>
  );
};