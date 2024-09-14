import { SkillRow } from "@/types";
import { useRef } from "react";

function useFileUpload(
    skill: SkillRow,
    rows: SkillRow[],
    closeCallback: () => void,
    setErrors: React.Dispatch<
        React.SetStateAction<{ name: string; image: string }>
    >,
    setSkill: React.Dispatch<React.SetStateAction<SkillRow>>,
    setRows: React.Dispatch<React.SetStateAction<SkillRow[]>>
) {
    const ref = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        ref.current?.click();
    };

    const handleFileChange = () => {
        const newFilePath = ref.current?.files?.[0]?.name;
        if (newFilePath) {
            setSkill((prev) => ({ ...prev, image: "/skills/" + newFilePath }));
        }
    };

    const submitFile = async () => {
        if (!ref.current?.files?.[0]) {
            return;
        }
        const formData = new FormData();
        formData.append("_id", skill._id);
        formData.append("name", skill.name);
        formData.append("image", ref.current?.files?.[0] as Blob);
        const newFilePath = ref.current?.files?.[0].name;

        const rowsClone = [...rows];

        setRows((prev: SkillRow[]) => {
            const newRows = prev.map((row: any) => {
                if (row._id === skill._id) {
                    return { ...row, image: "/skills/" + newFilePath };
                }
                return row;
            });
            return newRows;
        });
        const result = await fetch("/api/skills/photo", {
            method: skill._id === "" ? "POST" : "PUT",
            body: formData,
        });
        //optimistic approach

        if (!result.ok) {
            alert("Edit failed");
        }
        if (skill.name !== "") {
            closeCallback();
            setErrors({ name: "", image: "" });
        }
    };

    return { ref, handleFileClick, handleFileChange, submitFile };
}
export default useFileUpload;
