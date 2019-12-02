import React, { useCallback } from "react";

export const TrackingLink: React.FC<{
  href: string;
  id: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  id,
  children,
  ...props
}) => {
  const handler = useCallback(
    async ev => {
      ev.preventDefault();
      await fetch(`/out/${id}`);
      window.location.href = href;
    },
    [href, id]
  );
  return (
    <a href={href} {...props} onClick={handler}>
      {children}
    </a>
  );
};
