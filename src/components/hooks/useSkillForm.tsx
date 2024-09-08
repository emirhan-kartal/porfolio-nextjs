import { SkillRow, SkillRowWithoutId } from "@/types";

interface SkillFormType {
    skill: SkillRow;
    rows: SkillRow[];

    setRows: React.Dispatch<React.SetStateAction<SkillRow[]>>;
    closeCallback: () => void;
    submitFile: () => Promise<void>;
    setSkill: React.Dispatch<React.SetStateAction<SkillRow>>;
    setErrors: React.Dispatch<
        React.SetStateAction<{ name: string; image: string }>
    >;
}
function useSkillForm({
    skill,
    rows,
    setRows,
    closeCallback,
    submitFile,
    setSkill,
    setErrors,
}: SkillFormType) {
    const checkFields = () => {
        let toReturn = true;
        if (skill.name === "") {
            setErrors((prev) => {
                return { ...prev, name: "Name is required" };
            });
            toReturn = false;
        }
        if (skill.image === "") {
            setErrors((prev) => {
                return { ...prev, image: "Image is required" };
            });
            toReturn = false;
        }
        return toReturn;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkill((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleSave = async (rowState: SkillRow) => {
        console.time("fetch");
        console.time("optimistic");
        if (!checkFields()) {
            return;
        }
        const rowsClone = [...rows];

        setRows((prev: any) => {
            return prev.map((row: any) => {
                if (row._id === rowState._id) {
                    return rowState;
                }
                return row;
            });
        });
        console.timeEnd("optimistic");
        /*         if (ref.current?.files?.[0]) {
            await submitFile();
        } */

        const result = await fetch("/api/skills", {
            method: "PUT",
            body: JSON.stringify(rowState),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.timeEnd("fetch");
        if (!result.ok) {
            setRows(rowsClone);
            alert("Edit failed");
        }
        closeCallback();
    };

    const handleAdd = async (skillObject: SkillRowWithoutId) => {
        console.log(skillObject);
        if (!checkFields()) {
            return;
        }
        const tempId = Math.random().toString();
        const rowsClone = [...rows];
        setRows((prev: any) => {
            return [...prev, { ...skillObject, _id: tempId }];
        });
        closeCallback();
        await submitFile();
        const result = await fetch("/api/skills", {
            method: "POST",
            body: JSON.stringify(skillObject),
        });

        if (!result.ok) {
            setRows(rowsClone);
            alert(result.statusText);
        } else {
            const newSkill = await result.json();
            console.log(tempId);
            setRows((prev) => {
                return prev.map((row) => {
                    if (row._id === tempId) {
                        return {
                            ...row,
                            _id: newSkill.insertedId,
                        };
                    }
                    return row;
                });
            });
            console.log(newSkill);
        }
    };

    return {
        skill,
        handleChange,
        handleSave,
        handleAdd,
        setErrors,
        setSkill,
    };
}
export default useSkillForm;
