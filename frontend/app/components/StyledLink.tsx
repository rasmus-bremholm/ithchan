import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import React from "react";

type StyledLinkProps = Omit<MuiLinkProps, "href"> & {
	href: string;
	nextLinkProps?: Omit<NextLinkProps, "href">;
};

const StyledLink = React.forwardRef<HTMLAnchorElement, StyledLinkProps>(({ href, nextLinkProps, children, ...props }, ref) => {
	return (
		<MuiLink
			component={NextLink}
			href={href}
			ref={ref}
			{...nextLinkProps}
			{...props} // This spreads all MUI props like 'variant', 'underline', etc.
		>
			{children}
		</MuiLink>
	);
});

StyledLink.displayName = "StyledLink";

export default StyledLink;
