import { PageHeader } from "@/components/app/app-shell";
import { MessageCenter } from "@/components/app/message-center";
import { services } from "@/lib/services";
import { appMetadata } from "@/lib/seo";

export const metadata = appMetadata("Messages");

export default async function MessagesPage() {
  const session = (await services.auth.getSession())!;
  const threads = await services.coaching.listThreads(session.user.id);

  return (
    <>
      <PageHeader
        title="Messages"
        description="Ask your coach for quick feedback on an email, an opening line or a tricky question. In this demo, messages are not delivered."
      />
      <MessageCenter threads={threads} userId={session.user.id} userName={session.user.firstName} />
    </>
  );
}
