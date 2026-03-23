import { Container, Section, Skeleton } from "@/components/ui";

export default function ProductLoading() {
  return (
    <Section theme="surface" spacing="md">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Skeleton className="aspect-square w-full" />
          <div>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-4 h-10 w-3/4" />
            <Skeleton className="mt-5 h-6 w-24" />
            <Skeleton className="mt-10 h-14 w-full rounded-full" />
            <Skeleton className="mt-10 h-px w-full" />
            <Skeleton className="mt-8 h-20 w-full" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
