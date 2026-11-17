import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import {
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  FolderKanban,
  Lock,
  MessageSquare,
  Send,
  ShieldAlert,
  Users,
  Video,
} from "lucide-react";
import { AppShell } from "@/app/app-shell";
import { Kosong, Pill } from "@/app/ui-bits";
import { useOptionalSession, useSession, type Role } from "@/core/session";
import {
  clientsQuery,
  deliverablesQuery,
  documentsQuery,
  meetingsQuery,
  messagesQuery,
  projectsQuery,
  rupiahRingkas,
  statusProyek,
  statusTugas,
  tanggalPendek,
  tasksQuery,
} from "@/lib/data";

export function HomeDashboardPage() {
  const [clients, projects, tasks, deliverables] = useQueries({
    queries: [clientsQuery, projectsQuery, tasksQuery, deliverablesQuery],
  });

  const clientList = clients.data ?? [];
  const projectList = projects.data ?? [];
  const taskList = tasks.data ?? [];
  const deliverableList = deliverables.data ?? [];

  const totalNilaiKontrak = clientList.reduce(
    (sum, c) => sum + Number(c.nilai_kontrak || 0),
    0,
  );
  const completedTasks = taskList.filter((t) => t.status === "selesai").length;

  return (
    <AppShell
      title="Beranda Eksekutif"
      subtitle="Ringkasan operasional proyek, klien aktif, tugas prioritas, dan deliverable"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Klien</span>
              <Users className="size-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {clientList.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Nilai Kontrak {rupiahRingkas(totalNilaiKontrak)}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Proyek Aktif</span>
              <FolderKanban className="size-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {projectList.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Sedang berjalan & monitoring
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Tugas</span>
              <ClipboardList className="size-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {completedTasks} / {taskList.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Tugas terselesaikan
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Deliverables</span>
              <CheckCircle2 className="size-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {deliverableList.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Dokumen & artefak serah terima
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                Proyek Berjalan
              </h2>
              <Link
                to={"/proyek" as any}
                className="text-xs font-medium text-primary hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            {projectList.length === 0 ? (
              <Kosong pesan="Belum ada proyek aktif." />
            ) : (
              <div className="divide-y divide-border">
                {projectList.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {p.nama}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Selesai {tanggalPendek(p.tanggal_selesai)} · Progres{" "}
                        {p.progres ?? 0}%
                      </p>
                    </div>
                    <Pill value={statusProyek(p.status)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                Daftar Tugas Prioritas
              </h2>
              <Link
                to={"/task-manager" as any}
                className="text-xs font-medium text-primary hover:underline"
              >
                Kelola Tugas
              </Link>
            </div>
            {taskList.length === 0 ? (
              <Kosong pesan="Belum ada tugas tercatat." />
            ) : (
              <div className="divide-y divide-border">
                {taskList.slice(0, 5).map((t) => (
                  <div
                    key={t.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {t.judul}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tenggat {tanggalPendek(t.tenggat)}
                      </p>
                    </div>
                    <Pill value={statusTugas(t.status)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export function PartnerWorkspacePage() {
  const { session, dev } = useSession();
  const [projects, tasks, deliverables] = useQueries({
    queries: [projectsQuery, tasksQuery, deliverablesQuery],
  });

  const projectList = projects.data ?? [];
  const taskList = tasks.data ?? [];
  const deliverableList = deliverables.data ?? [];

  return (
    <AppShell
      title="Portal Mitra Konsultan"
      subtitle={`Ruang kerja kolaborasi mitra · ${session.name}`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        <div className="p-4 rounded-2xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Briefcase className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">
                Penugasan Mitra ({session.userId})
              </h2>
              <p className="text-xs text-muted-foreground">
                Hanya proyek, tugas, dan deliverable pada lingkup penugasan Anda yang ditampilkan.
              </p>
            </div>
          </div>
          {dev.enabled && (
            <button
              type="button"
              onClick={() => dev.resetSession()}
              className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted cursor-pointer"
            >
              Reset ke Sesi Konsultan
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="text-xs text-muted-foreground">Proyek Ditugaskan</div>
            <div className="text-2xl font-bold mt-1">{projectList.length}</div>
          </div>
          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="text-xs text-muted-foreground">Tugas Aktif</div>
            <div className="text-2xl font-bold mt-1">{taskList.length}</div>
          </div>
          <div className="p-4 rounded-2xl border border-border bg-card">
            <div className="text-xs text-muted-foreground">Deliverables</div>
            <div className="text-2xl font-bold mt-1">
              {deliverableList.length}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-foreground">Daftar Proyek</h3>
          {projectList.length === 0 ? (
            <Kosong pesan="Belum ada proyek dalam lingkup mitra saat ini." />
          ) : (
            <div className="divide-y divide-border">
              {projectList.map((p) => (
                <div
                  key={p.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{p.nama}</p>
                    <p className="text-xs text-muted-foreground">
                      Tenggat {tanggalPendek(p.tanggal_selesai)} · {p.progres ?? 0}%
                    </p>
                  </div>
                  <Pill value={statusProyek(p.status)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export function PortalWorkspacePage({
  defaultTab = "overview",
}: {
  defaultTab?: "overview" | "messages";
}) {
  const { session } = useSession();
  const [activeTab, setActiveTab] = useState<"overview" | "messages">(
    defaultTab,
  );
  const [projects, deliverables, messages, documents, meetings] = useQueries({
    queries: [
      projectsQuery,
      deliverablesQuery,
      messagesQuery,
      documentsQuery,
      meetingsQuery,
    ],
  });

  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<
    { id: string; sender: string; body: string; time: string }[]
  >([]);

  const projectList = projects.data ?? [];
  const deliverableList = deliverables.data ?? [];
  const docList = documents.data ?? [];
  const meetingList = meetings.data ?? [];
  const msgList = messages.data ?? [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setLocalMessages((prev) => [
      ...prev,
      {
        id: "local-" + Date.now(),
        sender: session.name,
        body: draft.trim(),
        time: "Baru saja",
      },
    ]);
    setDraft("");
  };

  return (
    <AppShell
      title="Portal Klien"
      subtitle={`Kolaborasi proyek, dokumen, jadwal rapat & komunikasi · ${session.name}`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Ringkasan & Dokumen
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 ${
              activeTab === "messages"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="size-3.5" />
            <span>Pesan Klien ({msgList.length + localMessages.length})</span>
          </button>
        </div>

        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FolderKanban className="size-4 text-primary" /> Proyek &
                  Deliverables
                </h3>
                {projectList.length === 0 ? (
                  <Kosong pesan="Belum ada proyek terdaftar." />
                ) : (
                  <div className="divide-y divide-border">
                    {projectList.map((p) => (
                      <div
                        key={p.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-semibold">{p.nama}</p>
                          <p className="text-xs text-muted-foreground">
                            Target selesai {tanggalPendek(p.tanggal_selesai)} ·{" "}
                            {deliverableList.filter((d) => d.project_id === p.id).length}{" "}
                            deliverable
                          </p>
                        </div>
                        <Pill value={statusProyek(p.status)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FileText className="size-4 text-primary" /> Dokumen Bersama
                </h3>
                {docList.length === 0 ? (
                  <Kosong pesan="Belum ada dokumen bersama." />
                ) : (
                  <div className="divide-y divide-border">
                    {docList.slice(0, 6).map((d) => (
                      <div
                        key={d.id}
                        className="py-2.5 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-foreground">
                          {d.nama}
                        </span>
                        <span className="text-muted-foreground">
                          {d.kategori} · {d.ukuran}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3 self-start">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Video className="size-4 text-primary" /> Jadwal Pertemuan
              </h3>
              {meetingList.length === 0 ? (
                <Kosong pesan="Belum ada agenda pertemuan." />
              ) : (
                <div className="space-y-3">
                  {meetingList.slice(0, 5).map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border border-border bg-muted/30 space-y-1"
                    >
                      <div className="text-xs font-bold text-foreground">
                        {m.judul}
                      </div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <Clock className="size-3" /> {tanggalPendek(m.mulai)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {msgList.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">
                      {m.pengirim}
                    </span>
                    <span className="text-muted-foreground">
                      {tanggalPendek(m.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/90">{m.isi}</p>
                </div>
              ))}
              {localMessages.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">
                      {m.sender}
                    </span>
                    <span className="text-muted-foreground">{m.time}</span>
                  </div>
                  <p className="text-xs text-foreground/90">{m.body}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-border">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Tulis pesan untuk tim konsultan..."
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-border bg-background focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="size-3.5" />
                Kirim
              </button>
            </form>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function AccessDeniedPage() {
  const session = useOptionalSession();
  const navigate = useNavigate();
  const devCtx = useSession();

  const switchAndGo = (role: Role, dest: string) => {
    devCtx.dev.switchRole(role);
    navigate({ to: dest as any });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-border bg-card p-6 text-center space-y-4 shadow-sm">
        <div className="size-12 rounded-2xl bg-rose-500/10 text-rose-600 mx-auto flex items-center justify-center">
          {session ? <ShieldAlert className="size-6" /> : <Lock className="size-6" />}
        </div>
        <div className="space-y-1">
          <h1 className="text-lg font-bold text-foreground">Akses Ditolak</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {session
              ? `Peran aktif Anda (${session.role}) tidak memiliki izin untuk membuka area rute tersebut.`
              : "Sesi aktif tidak ditemukan atau tidak valid. Sistem menerapkan kebijakan fail-closed."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
          >
            Kembali ke Beranda
          </Link>
          {devCtx.dev.enabled && (
            <>
              <button
                type="button"
                onClick={() => switchAndGo("konsultan", "/")}
                className="px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted cursor-pointer"
              >
                Masuk Konsultan
              </button>
              <button
                type="button"
                onClick={() => switchAndGo("mitra", "/partner")}
                className="px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted cursor-pointer"
              >
                Masuk Mitra
              </button>
              <button
                type="button"
                onClick={() => switchAndGo("klien", "/portal")}
                className="px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted cursor-pointer"
              >
                Masuk Klien
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
