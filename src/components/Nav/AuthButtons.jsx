import { tinaField } from "tinacms/dist/react";
import Button from "@/components/common/Button";

export default function AuthButtons({ user, authStyle, authLabelLogin, authLabelSignout, openModal, handleSignout, setUser, isMobile = false }) {
  const variant = authStyle === "button" ? "primary" : "border";

  if (!user) {
    return (
      <Button
        variant={variant}
        onClick={() => openModal("login")}
        data-tina-field={tinaField({ authStyle, authLabelLogin }, "authLabelLogin")}
      >
        {authLabelLogin}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={() => handleSignout(setUser)}
      data-tina-field={tinaField({ authStyle, authLabelSignout }, "authLabelSignout")}
    >
      {authLabelSignout}
    </Button>
  );
}
