"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Trash2,
  Phone,
  MessageCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  Moon,
  Sun,
  RefreshCw,
} from "lucide-react";

type Appointment = {
  name: string;
  phone: string;
  service: string;
  date: string;
  comment?: string;
  timestamp?: string;
  contacted?: boolean;
};

type Tab = "dashboard" | "appointments" | "settings";

export default function AdminPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "contacted">("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    try {
      const isAdmin = sessionStorage.getItem("isAdmin");
      if (!isAdmin) {
        router.push("/");
        return;
      }
    } catch {
      router.push("/");
      return;
    }

    loadAppointments();

    const bcSupported = typeof BroadcastChannel !== "undefined";
    let bc: BroadcastChannel | null = null;
    try {
      if (bcSupported) {
        bc = new BroadcastChannel("appointments");
        bc.onmessage = () => loadAppointments();
      }
    } catch {
      bc = null;
    }

    const onStorage = (ev: StorageEvent) => {
      if (ev.key === "offline_appointments") loadAppointments();
    };
    const onCustom = () => loadAppointments();

    window.addEventListener("storage", onStorage);
    window.addEventListener("appointments-updated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("appointments-updated", onCustom);
      try {
        if (bc) bc.close();
      } catch {}
    };
  }, [router]);

  function loadAppointments() {
    try {
      const raw = localStorage.getItem("offline_appointments");
      const arr = raw ? JSON.parse(raw) : [];
      const normalized = Array.isArray(arr)
        ? arr.map((a: Appointment) => ({ contacted: false, ...a }))
        : [];
      setAppointments(normalized.reverse());
    } catch {
      setAppointments([]);
    }
  }

  function saveAppointments(list: Appointment[]) {
    try {
      localStorage.setItem("offline_appointments", JSON.stringify(list.slice().reverse()));
      setAppointments(list);
    } catch (e) {
      console.error(e);
    }
  }

  // Stats
  const stats = useMemo(() => {
    const total = appointments.length;
    const contacted = appointments.filter((a) => a.contacted).length;
    const pending = total - contacted;
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = appointments.filter((a) => a.date === today).length;
    
    // Service breakdown
    const services: Record<string, number> = {};
    appointments.forEach((a) => {
      services[a.service] = (services[a.service] || 0) + 1;
    });

    // Last 7 days
    const last7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const count = appointments.filter((a) => a.timestamp?.slice(0, 10) === dateStr || a.date === dateStr).length;
      last7Days.push({ date: dateStr, count });
    }

    return { total, contacted, pending, todayCount, services, last7Days };
  }, [appointments]);

  // Unique services for filter
  const uniqueServices = useMemo(() => {
    const set = new Set(appointments.map((a) => a.service));
    return Array.from(set);
  }, [appointments]);

  // Filtered & sorted
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appointments.filter((a) => {
      if (statusFilter === "pending" && a.contacted) return false;
      if (statusFilter === "contacted" && !a.contacted) return false;
      if (serviceFilter !== "all" && a.service !== serviceFilter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        (a.service || "").toLowerCase().includes(q)
      );
    });
  }, [appointments, query, statusFilter, serviceFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((x, y) => {
      const tx = new Date(x.timestamp || x.date || 0).getTime();
      const ty = new Date(y.timestamp || y.date || 0).getTime();
      return sortOrder === "desc" ? ty - tx : tx - ty;
    });
    return arr;
  }, [filtered, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const handleMarkContacted = (index: number) => {
    const list = [...appointments];
    list[index].contacted = true;
    saveAppointments(list);
  };

  const handleDelete = (index: number) => {
    if (!confirm("Bu yozilishni o'chirmoqchimisiz?")) return;
    const list = appointments.filter((_, i) => i !== index);
    saveAppointments(list);
  };

  const handleExport = () => {
    const rows = [
      ["Ism", "Telefon", "Xizmat", "Sana", "Izoh", "Vaqt", "Holat"],
      ...sorted.map((a) => [
        a.name,
        a.phone,
        a.service,
        a.date,
        a.comment || "",
        a.timestamp || "",
        a.contacted ? "Bog'langan" : "Kutmoqda",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (!confirm("Hamma yozilishlarni o'chirmoqchimisiz? Bu qaytarib bo'lmaydi!")) return;
    localStorage.removeItem("offline_appointments");
    setAppointments([]);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("isAdmin");
    } catch {}
    router.push("/");
  };

  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-100";
  const cardClass = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900 border border-gray-200";
  const textMuted = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bgClass} flex`}>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className={`${darkMode ? "bg-gray-800" : "bg-white"} border-r ${darkMode ? "border-gray-700" : "border-gray-200"} flex flex-col fixed h-full z-40`}
      >
        {/* Logo */}
        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              darkMode ? "bg-gradient-to-br from-primary to-primary-dark" : "bg-gray-900"
            }`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H13V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5V11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13H11V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19V13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
                  fill="white"
                />
              </svg>
            </div>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>DentCare</h1>
                <p className={`text-xs ${textMuted}`}>Admin Panel</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard" as Tab, icon: LayoutDashboard, label: "Dashboard" },
            { id: "appointments" as Tab, icon: Calendar, label: "Yozilishlar" },
            { id: "settings" as Tab, icon: Settings, label: "Sozlamalar" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              tabIndex={-1}
              style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-0 focus:border-0 ${
                activeTab === item.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : `${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100 text-gray-900"}`
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`p-4 border-t space-y-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100 text-gray-900"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Chiqish</span>}
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute -right-3 top-20 w-6 h-6 ${cardClass} border rounded-full flex items-center justify-center shadow-md`}
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "ml-[280px]" : "ml-[80px]"} transition-all duration-300`}>
        {/* Header */}
        <header className={`${cardClass} border-b ${darkMode ? "border-gray-700" : "border-gray-200"} px-8 py-4 sticky top-0 z-30`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "appointments" && "Yozilishlar"}
                {activeTab === "settings" && "Sozlamalar"}
              </h2>
              <p className={textMuted}>
                {new Date().toLocaleDateString("uz-UZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadAppointments}
                className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <RefreshCw size={20} />
              </button>
              <button className={`relative p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Bell size={20} />
                {stats.pending > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.pending}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Admin</p>
                  <p className={`text-xs ${textMuted}`}>Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: "Jami yozilishlar", value: stats.total, icon: Users, color: "from-blue-500 to-blue-600", change: "+12%" },
                    { label: "Bugungi", value: stats.todayCount, icon: Calendar, color: "from-green-500 to-emerald-600", change: "+5%" },
                    { label: "Kutayotganlar", value: stats.pending, icon: Clock, color: "from-amber-500 to-orange-600", change: "-3%" },
                    { label: "Bog'langan", value: stats.contacted, icon: CheckCircle, color: "from-purple-500 to-violet-600", change: "+8%" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`${cardClass} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                          <stat.icon className="text-white" size={24} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          stat.change.startsWith("+") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                      <p className={textMuted}>{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  {/* Weekly Chart */}
                  <div className={`${cardClass} rounded-2xl p-6 shadow-sm lg:col-span-2`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg">Haftalik statistika</h3>
                      <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <div className="flex items-end justify-between h-48 gap-4">
                      {stats.last7Days.map((day, i) => {
                        const maxCount = Math.max(...stats.last7Days.map((d) => d.count), 1);
                        const height = (day.count / maxCount) * 100;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max(height, 8)}%` }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                              className={`w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg min-h-[8px]`}
                            />
                            <span className={`text-xs ${textMuted}`}>
                              {new Date(day.date).toLocaleDateString("uz-UZ", { weekday: "short" })}
                            </span>
                            <span className="text-sm font-medium">{day.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Services Breakdown */}
                  <div className={`${cardClass} rounded-2xl p-6 shadow-sm`}>
                    <h3 className="font-semibold text-lg mb-6">Xizmatlar bo'yicha</h3>
                    <div className="space-y-4">
                      {Object.entries(stats.services).slice(0, 5).map(([service, count], i) => {
                        const percentage = Math.round((count / stats.total) * 100) || 0;
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="truncate">{service}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                            <div className={`h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent Appointments */}
                <div className={`${cardClass} rounded-2xl p-6 shadow-sm`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">So'nggi yozilishlar</h3>
                    <button
                      onClick={() => setActiveTab("appointments")}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Hammasini ko'rish
                    </button>
                  </div>
                  <div className="space-y-4">
                    {appointments.slice(0, 5).map((a, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary">{a.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{a.name}</h4>
                            <p className={`text-sm ${textMuted}`}>{a.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{a.date}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            a.contacted ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                          }`}>
                            {a.contacted ? "Bog'langan" : "Kutmoqda"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Filters */}
                <div className={`${cardClass} rounded-2xl p-6 shadow-sm mb-6`}>
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} size={20} />
                      <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        placeholder="Qidirish..."
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1); }}
                      className={`px-4 py-3 rounded-xl border ${
                        darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <option value="all">Barcha holat</option>
                      <option value="pending">Kutmoqda</option>
                      <option value="contacted">Bog'langan</option>
                    </select>

                    {/* Service Filter */}
                    <select
                      value={serviceFilter}
                      onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}
                      className={`px-4 py-3 rounded-xl border ${
                        darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <option value="all">Barcha xizmat</option>
                      {uniqueServices.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {/* Sort */}
                    <select
                      value={sortOrder}
                      onChange={(e) => { setSortOrder(e.target.value as typeof sortOrder); setPage(1); }}
                      className={`px-4 py-3 rounded-xl border ${
                        darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <option value="desc">Yangi → Eski</option>
                      <option value="asc">Eski → Yangi</option>
                    </select>

                    {/* Actions */}
                    <button
                      onClick={handleExport}
                      className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                    >
                      <Download size={18} />
                      <span>Export</span>
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="flex items-center gap-2 px-4 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={18} />
                      <span>Tozalash</span>
                    </button>
                  </div>
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-4">
                  <p className={textMuted}>
                    {sorted.length} ta yozilish topildi
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={textMuted}>Sahifada:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                      className={`px-3 py-1 rounded-lg border ${
                        darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                      }`}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className={`${cardClass} rounded-2xl shadow-sm overflow-hidden`}>
                  {sorted.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className={textMuted} size={32} />
                      </div>
                      <h3 className="font-semibold mb-2">Yozilish topilmadi</h3>
                      <p className={textMuted}>Qidiruv shartlarini o'zgartiring</p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                            <tr>
                              <th className="text-left px-6 py-4 font-semibold">Bemor</th>
                              <th className="text-left px-6 py-4 font-semibold">Telefon</th>
                              <th className="text-left px-6 py-4 font-semibold">Xizmat</th>
                              <th className="text-left px-6 py-4 font-semibold">Sana</th>
                              <th className="text-left px-6 py-4 font-semibold">Holat</th>
                              <th className="text-right px-6 py-4 font-semibold">Amallar</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {pageItems.map((a, idx) => {
                              const realIndex = appointments.indexOf(a);
                              return (
                                <motion.tr
                                  key={idx}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className={`${darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"} transition-colors`}
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-primary">{a.name.charAt(0)}</span>
                                      </div>
                                      <div>
                                        <p className="font-medium">{a.name}</p>
                                        {a.comment && (
                                          <p className={`text-xs ${textMuted} truncate max-w-[150px]`}>{a.comment}</p>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <a href={`tel:${a.phone}`} className="text-primary hover:underline">{a.phone}</a>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      darkMode ? "bg-primary/20 text-primary-light" : "bg-primary/10 text-primary"
                                    }`}>
                                      {a.service}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="font-medium">{a.date}</p>
                                    <p className={`text-xs ${textMuted}`}>{a.timestamp?.slice(11, 16) || ""}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      a.contacted
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                    }`}>
                                      {a.contacted ? "Bog'langan" : "Kutmoqda"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                      <a
                                        href={`tel:${a.phone}`}
                                        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-500 transition-colors"
                                      >
                                        <Phone size={18} />
                                      </a>
                                      <a
                                        href={`https://wa.me/${a.phone.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500 transition-colors"
                                      >
                                        <MessageCircle size={18} />
                                      </a>
                                      <button
                                        onClick={() => { setSelected(realIndex); setShowDetail(true); }}
                                        className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} transition-colors`}
                                      >
                                        <Eye size={18} />
                                      </button>
                                      {!a.contacted && (
                                        <button
                                          onClick={() => handleMarkContacted(realIndex)}
                                          className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500 transition-colors"
                                        >
                                          <CheckCircle size={18} />
                                        </button>
                                      )}
                                      <button
                                        onClick={() => handleDelete(realIndex)}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                    </div>
                                  </td>
                                </motion.tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className={`flex items-center justify-between px-6 py-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                        <p className={textMuted}>
                          {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, sorted.length)} / {sorted.length}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`p-2 rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-200"} disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <ChevronLeft size={18} />
                          </button>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = i + 1;
                            if (totalPages > 5) {
                              if (page > 3) pageNum = page - 2 + i;
                              if (page > totalPages - 2) pageNum = totalPages - 4 + i;
                            }
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`w-10 h-10 rounded-lg font-medium ${
                                  page === pageNum
                                    ? "bg-primary text-white"
                                    : `${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className={`p-2 rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-200"} disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl"
              >
                <div className={`${cardClass} rounded-2xl p-6 shadow-sm mb-6`}>
                  <h3 className="font-semibold text-lg mb-6">Umumiy sozlamalar</h3>
                  
                  <div className="space-y-6">
                    {/* Dark Mode */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Qorong'u rejim</p>
                        <p className={`text-sm ${textMuted}`}>Interfeys rangini o'zgartirish</p>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-14 h-8 rounded-full transition-colors ${
                          darkMode ? "bg-primary" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          animate={{ x: darkMode ? 24 : 4 }}
                          className="w-6 h-6 bg-white rounded-full shadow"
                        />
                      </button>
                    </div>

                    {/* Sidebar */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Kengaytirilgan sidebar</p>
                        <p className={`text-sm ${textMuted}`}>Sidebar menyusini kengaytirish</p>
                      </div>
                      <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`w-14 h-8 rounded-full transition-colors ${
                          sidebarOpen ? "bg-primary" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          animate={{ x: sidebarOpen ? 24 : 4 }}
                          className="w-6 h-6 bg-white rounded-full shadow"
                        />
                      </button>
                    </div>

                    {/* Page Size */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sahifadagi elementlar</p>
                        <p className={`text-sm ${textMuted}`}>Jadvalda ko'rsatiladigan qatorlar soni</p>
                      </div>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className={`px-4 py-2 rounded-xl border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={`${cardClass} rounded-2xl p-6 shadow-sm mb-6`}>
                  <h3 className="font-semibold text-lg mb-6">Ma'lumotlar</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                      <div>
                        <p className="font-medium text-blue-700 dark:text-blue-400">CSV eksport</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Barcha yozilishlarni yuklab olish</p>
                      </div>
                      <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        <Download size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
                      <div>
                        <p className="font-medium text-red-700 dark:text-red-400">Ma'lumotlarni tozalash</p>
                        <p className="text-sm text-red-600 dark:text-red-300">Barcha yozilishlarni o'chirish</p>
                      </div>
                      <button
                        onClick={handleClearAll}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`${cardClass} rounded-2xl p-6 shadow-sm`}>
                  <h3 className="font-semibold text-lg mb-6">Hisob</h3>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Admin</p>
                      <p className={textMuted}>Super Administrator</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Hisobdan chiqish</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && selected !== null && appointments[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`${cardClass} rounded-3xl p-8 w-full max-w-lg shadow-2xl`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {appointments[selected].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{appointments[selected].name}</h3>
                    <p className={textMuted}>{appointments[selected].service}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetail(false)}
                  className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <Phone className="text-primary" size={20} />
                  <div>
                    <p className={`text-sm ${textMuted}`}>Telefon</p>
                    <a href={`tel:${appointments[selected].phone}`} className="font-medium text-primary">
                      {appointments[selected].phone}
                    </a>
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <p className={`text-sm ${textMuted}`}>Sana</p>
                    <p className="font-medium">{appointments[selected].date}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <Clock className="text-primary" size={20} />
                  <div>
                    <p className={`text-sm ${textMuted}`}>Yuborilgan vaqt</p>
                    <p className="font-medium">{appointments[selected].timestamp || "-"}</p>
                  </div>
                </div>

                {appointments[selected].comment && (
                  <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <p className={`text-sm ${textMuted} mb-2`}>Izoh</p>
                    <p>{appointments[selected].comment}</p>
                  </div>
                )}

                <div className={`flex items-center gap-4 p-4 rounded-xl ${
                  appointments[selected].contacted
                    ? "bg-green-50 dark:bg-green-900/20"
                    : "bg-amber-50 dark:bg-amber-900/20"
                }`}>
                  {appointments[selected].contacted ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Clock className="text-amber-500" size={20} />
                  )}
                  <div>
                    <p className={`text-sm ${appointments[selected].contacted ? "text-green-600" : "text-amber-600"}`}>
                      Holat
                    </p>
                    <p className={`font-medium ${appointments[selected].contacted ? "text-green-700" : "text-amber-700"}`}>
                      {appointments[selected].contacted ? "Bog'langan" : "Kutmoqda"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`tel:${appointments[selected].phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <Phone size={18} />
                  <span>Qo'ng'iroq</span>
                </a>
                <a
                  href={`https://wa.me/${appointments[selected].phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </a>
              </div>

              {!appointments[selected].contacted && (
                <button
                  onClick={() => {
                    handleMarkContacted(selected);
                    setShowDetail(false);
                  }}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <CheckCircle size={18} />
                  <span>Bog'landim deb belgilash</span>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
