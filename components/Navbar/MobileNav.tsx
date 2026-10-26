import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export interface MobileNavProps {
  links?: { href: string; label: string }[];
  ctaText?: string;
  ctaLink?: string;
  brandName: string;
  brandRole?: string;
}

export function MobileNav({
  links = [],
  ctaText = "Randevu Al",
  ctaLink = "#randevu",
  brandName,
  brandRole,
}: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="border-brand-border bg-brand-primary/40 text-brand-heading hover:bg-brand-primary hover:text-brand-heading xl:hidden"
            aria-label="Menüyü Aç"
          >
            <Menu className="h-5 w-5" />
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="bg-brand-bg border-l border-brand-border flex flex-col justify-between p-6"
      >
        <div>
          <SheetHeader className="text-left border-b border-brand-border pb-4">
            <SheetTitle className="text-xl font-serif font-bold text-brand-heading tracking-tight">
              {brandName}
            </SheetTitle>
            <SheetDescription className="text-xs text-brand-body">
              {brandRole}
            </SheetDescription>
          </SheetHeader>

          {/* Menü Linkleri: SheetClose ile tıklandığı an çekmece kendiliğinden kapanır */}
          <nav className="flex flex-col gap-2 pt-6">
            {links?.map((link) => (
              <SheetClose
                key={link.href}
                render={
                  <a
                    href={link.href}
                    className="px-3 py-2.5 rounded-xl text-sm font-medium text-brand-heading hover:bg-brand-primary/60 hover:text-brand-heading transition-colors"
                  >
                    {link.label}
                  </a>
                }
              />
            ))}
          </nav>
        </div>

        {/* Footer & CTA */}
        <SheetFooter className="mt-auto border-t border-brand-border pt-6 flex-col gap-3">
          <SheetClose
            nativeButton={false}
            render={
              <a
                href={ctaLink.startsWith("#") ? ctaLink : "#randevu"}
                className="w-full text-center py-3 px-4 rounded-xl bg-brand-heading text-brand-bg font-medium text-sm hover:bg-brand-heading/90 transition-colors shadow-sm"
              >
                {ctaText}
              </a>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
