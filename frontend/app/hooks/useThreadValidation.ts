import { useState, useCallback } from "react";

interface Fields {
	subject: string;
	content: string;
}

interface Errors {
	subject: string | null;
	content: string | null;
}

function validate(fields: Fields): Errors {
	return {
		subject: fields.subject.trim() === "" ? "Subject is required" : null,
		content: fields.content.trim() === "" ? "Content is required" : null,
	};
}

export function useNewThreadValidation(fields: Fields) {
	const [touched, setTouched] = useState<Record<keyof Fields, boolean>>({
		subject: false,
		content: false,
	});

	const errors = validate(fields);

	const isValid = Object.values(errors).every((e) => e === null);

	const onBlur = useCallback((field: keyof Fields) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	}, []);

	const visableErrors: Errors = {
		subject: touched.subject ? errors.subject : null,
		content: touched.content ? errors.subject : null,
	};

	return { errors: visableErrors, isValid, onBlur };
}
