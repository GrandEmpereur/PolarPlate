"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, Mail, User, KeyRound, Upload, X, ArrowRight, Home } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSignUp = async () => {
		if (password !== passwordConfirmation) {
			toast.error("Les mots de passe ne correspondent pas");
			return;
		}

		try {
			await signUp.email({
				email,
				password,
				name: `${firstName} ${lastName}`,
				image: image ? await convertImageToBase64(image) : "",
				callbackURL: "/dashboard",
				fetchOptions: {
					onResponse: () => {
						setLoading(false);
					},
					onRequest: () => {
						setLoading(true);
					},
					onError: (ctx) => {
						console.error("Erreur d'inscription:", ctx.error);
						toast.error(ctx.error.message);
					},
					onSuccess: async () => {
						toast.success("Compte créé avec succès! Veuillez vérifier votre email pour activer votre compte.", {
							duration: 6000,
							description: "Un email de vérification a été envoyé à votre adresse email.",
						});
						router.push(`/auth/verify-notice?email=${encodeURIComponent(email)}`);
					},
				},
			});
		} catch (error) {
			console.error("Exception lors de l'inscription:", error);
			setLoading(false);
			toast.error("Une erreur est survenue lors de la création du compte");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 relative overflow-hidden">
			{/* Éléments décoratifs en arrière-plan */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
				<div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
			</div>
			
			{/* Bouton de retour à l'accueil */}
			<motion.div 
				className="absolute top-6 left-6 z-10"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<Button variant="ghost" size="sm" className="gap-2" asChild>
					<Link href="/">
						<Home className="h-4 w-4" />
						<span>Accueil</span>
					</Link>
				</Button>
			</motion.div>
			
			<div className="flex flex-col md:flex-row-reverse max-w-6xl w-full gap-6 z-10">
				{/* Image et texte d'introduction */}
				<motion.div 
					className="hidden md:flex flex-col justify-center items-center md:w-1/3 p-6 rounded-2xl bg-primary/5 backdrop-blur-sm"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="relative w-64 h-64 mb-8">
						<Image 
							src="/images/signup-illustration.svg" 
							alt="Illustration inscription" 
							fill
							className="object-contain"
							onError={(e) => {
								// Fallback si l'image n'existe pas
								const target = e.target as HTMLImageElement;
								target.src = "https://illustrations.popsy.co/amber/sign-up.svg";
							}}
						/>
					</div>
					<h2 className="text-2xl font-bold text-center mb-4">Rejoignez PolarPlate</h2>
					<p className="text-center text-muted-foreground max-w-sm">
						Créez votre compte en quelques étapes et commencez à profiter de tous les avantages de notre plateforme.
					</p>
					
					<div className="w-full mt-8">
						<Separator className="mb-6" />
						<div className="flex flex-col space-y-2">
							<div className="flex items-center gap-2">
								<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">1</div>
								<p className="text-sm">Créez votre compte</p>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">2</div>
								<p className="text-sm">Vérifiez votre email</p>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">3</div>
								<p className="text-sm">Configurez votre profil</p>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">4</div>
								<p className="text-sm">Commencez à utiliser l'application</p>
							</div>
						</div>
					</div>
				</motion.div>
				
				{/* Formulaire d'inscription */}
				<motion.div 
					className="w-full md:w-2/3"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card className="w-full border-border/40 shadow-lg">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl font-bold">Inscription</CardTitle>
							<CardDescription>
								Créez votre compte pour commencer
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6 p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="first-name" className="text-sm font-medium">Prénom</Label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="first-name"
											placeholder="Jean"
											required
											className="pl-10"
											onChange={(e) => setFirstName(e.target.value)}
											value={firstName}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="last-name" className="text-sm font-medium">Nom</Label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="last-name"
											placeholder="Dupont"
											required
											className="pl-10"
											onChange={(e) => setLastName(e.target.value)}
											value={lastName}
										/>
									</div>
								</div>
							</div>
							
							<div className="space-y-2">
								<Label htmlFor="email" className="text-sm font-medium">Email</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										id="email"
										type="email"
										placeholder="jean.dupont@exemple.com"
										required
										className="pl-10"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
									/>
								</div>
							</div>
							
							<div className="space-y-2">
								<Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
								<div className="relative">
									<KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										id="password"
										type="password"
										placeholder="••••••••"
										autoComplete="new-password"
										className="pl-10"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>
							
							<div className="space-y-2">
								<Label htmlFor="password_confirmation" className="text-sm font-medium">Confirmer le mot de passe</Label>
								<div className="relative">
									<KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										id="password_confirmation"
										type="password"
										placeholder="••••••••"
										autoComplete="new-password"
										className="pl-10"
										value={passwordConfirmation}
										onChange={(e) => setPasswordConfirmation(e.target.value)}
									/>
								</div>
								{password && passwordConfirmation && password !== passwordConfirmation && (
									<p className="text-xs text-destructive mt-1">Les mots de passe ne correspondent pas</p>
								)}
							</div>
							
							<div className="space-y-2">
								<Label htmlFor="image" className="text-sm font-medium">Image de profil <span className="text-xs text-muted-foreground">(optionnel)</span></Label>
								<div className="flex items-center gap-4">
									<div className="relative h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
										{imagePreview ? (
											<>
												<Image
													src={imagePreview}
													alt="Aperçu du profil"
													fill
													className="object-cover"
												/>
												<button
													type="button"
													onClick={() => {
														setImage(null);
														setImagePreview(null);
													}}
													className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
												>
													<X className="h-4 w-4 text-white" />
												</button>
											</>
										) : (
											<Upload className="h-5 w-5 text-muted-foreground" />
										)}
									</div>
									<div className="flex-1">
										<Input
											id="image"
											type="file"
											accept="image/*"
											onChange={handleImageChange}
											className="cursor-pointer"
										/>
										<p className="text-xs text-muted-foreground mt-1">PNG, JPG ou GIF jusqu'à 2MB</p>
									</div>
								</div>
							</div>
							
							<Button
								type="submit"
								className="w-full relative bg-primary/90 hover:bg-primary transition-colors"
								disabled={loading}
								onClick={handleSignUp}
							>
								{loading ? (
									<Loader2 className="h-4 w-4 animate-spin mr-2" />
								) : null}
								{loading ? "Création en cours..." : "Créer mon compte"}
								{!loading && <ArrowRight className="h-4 w-4 ml-2 absolute right-4" />}
							</Button>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4 border-t border-border/40 bg-muted/20 p-6">
							<div className="text-center text-sm">
								Vous avez déjà un compte?{" "}
								<Link href="/auth/sign-in" className="font-semibold text-primary hover:underline">
									Se connecter
								</Link>
							</div>
							<p className="text-center text-xs text-muted-foreground">
								En créant un compte, vous acceptez nos{" "}
								<Link href="/terms" className="underline underline-offset-4 hover:text-primary">
									Conditions d'utilisation
								</Link>{" "}
								et notre{" "}
								<Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
									Politique de confidentialité
								</Link>
								.
							</p>
						</CardFooter>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}