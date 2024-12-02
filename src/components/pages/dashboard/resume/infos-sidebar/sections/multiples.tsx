import { Separator } from "@radix-ui/react-separator";
import {
  BicepsFlexed,
  BriefcaseBusiness,
  FileBadge2,
  Globe,
  GraduationCap,
  Languages,
  Share2,
} from "lucide-react";
import { Fragment, useState } from "react";
import { MultipleDragItemData, MultipleDragList } from "../multiple-drag-list";
import { ManageMultipleItemDialog } from "../multiple-drag-list/manage-multiple-item-dialog";

export const MultipleSections = () => {
  const [sectionToAdd, setSectionToAdd] = useState<MultipleDragItemData | null>(
    null
  );

  // console.log({ sectionToAdd });
  const sectionsKeys: MultipleDragItemData[] = [
    {
      formKey: "socialMedias",
      title: "Redes Sociais",
      icon: Share2,
      titleKey: "name",
      descriptionKey: "username",
    },
    {
      formKey: "experiences",
      title: "Experiências",
      icon: BriefcaseBusiness,
      titleKey: "company",
      descriptionKey: "position",
    },
    {
      formKey: "educations",
      title: "Educação",
      icon: GraduationCap,
      titleKey: "institution",
      descriptionKey: "degree",
    },
    {
      formKey: "skills",
      title: "Habilidades",
      icon: BicepsFlexed,
      titleKey: "name",
      descriptionKey: "description",
    },
    {
      formKey: "languages",
      title: "Idiomas",
      icon: Languages,
      titleKey: "name",
      descriptionKey: "description",
    },
    {
      formKey: "certifications",
      title: "Certificações",
      icon: FileBadge2,
      titleKey: "name",
      descriptionKey: "institution",
    },
    {
      formKey: "projects",
      title: "Projetos",
      icon: Globe,
      titleKey: "name",
      descriptionKey: "description",
    },
  ];

  return (
    <div>
      {sectionsKeys.map((section) => (
        <Fragment key={`multiple-section-${section.title}`}>
          <Separator className="my-5" />
          <MultipleDragList
            data={section}
            onAdd={() => setSectionToAdd(section)}
            onEdit={(index) => {}}
          />
        </Fragment>
      ))}

      {sectionToAdd && (
        <ManageMultipleItemDialog
          data={sectionToAdd}
          open={!!sectionToAdd}
          setOpen={(value) => {
            if (!value) setSectionToAdd(null);
          }}
        />
      )}

      {sectionToAdd && (
        <ManageMultipleItemDialog
          data={sectionToAdd}
          open={!!sectionToAdd}
          setOpen={(value) => {}}
        />
      )}
    </div>
  );
};
