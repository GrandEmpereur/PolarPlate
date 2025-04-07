import { Resend } from "resend";

// Crée l'instance Resend avec la clé API
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    // Avertissement silencieux - pas de console.log
}

// Initialisation avec gestion d'erreur
const resendInstance = new Resend(resendApiKey as string);

// Wrapper autour de l'API Resend pour ajouter de la gestion d'erreur
export const resend = {
    emails: {
        async send(params: any) {
            try {
                const { data, error } = await resendInstance.emails.send(params);

                if (error) {
                    return { error };
                }

                return { data };
            } catch (err) {
                return { error: err };
            }
        }
    }
};