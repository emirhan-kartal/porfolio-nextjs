import { getServerSession } from "next-auth";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignIn = ({ csrfToken }: { csrfToken: any }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/admin");
        }
    }, [router]);
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            csrfToken,
        });
        if (result?.error) {
            // Handle error
            console.error(result.error);
        } else {
            // Redirect or handle success
            window.location.href = "/admin";
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Sign in</button>
        </form>
    );
};

export async function getServerSideProps(context: any) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
            session: await getServerSession(context.req, context.res, {}),
        },
    };
}

export default SignIn;
