type AbandonType = "Discontinued" | "Under Construction";

type WorkType = "website";

type WorkProp = Record<"name" | "description" | "url" | "imageURL", string> & {
  abandonedType?: AbandonType
  embedURL?: string;
  type: WorkType;
};

