"use client";

import {
  Fragment,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase-client";
import { checkUserStatus } from "@/lib/checkUserStatus";


export default function
StudentDashboard() {

  // =========================================
  // USER
  // =========================================

  const [
    profile,
    setProfile,
  ] = useState<any>(null);

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    showProfileModal,
    setShowProfileModal,
  ] = useState(false);

  const [
    activeModule,
    setActiveModule,
  ] = useState("HOME");

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    mobileNumber,
    setMobileNumber,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  // =========================================
  // STUDENT CLASSES
  // =========================================

  const [
    classIds,
    setClassIds,
  ] = useState<string[]>([]);

  // =========================================
  // MESSAGES
  // =========================================

  const [
    messages,
    setMessages,
  ] = useState<any[]>([]);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    selectedClassGroup,
    setSelectedClassGroup,
  ] = useState("ALL");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("ALL");

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState("ALL");

  const [
    sortOption,
    setSortOption,
  ] = useState("LATEST");

  const [
    expandedMessageId,
    setExpandedMessageId,
  ] = useState("");

  // =========================================
  // ACKNOWLEDGED
  // =========================================

  const [
    acknowledgedMessages,
    setAcknowledgedMessages,
  ] = useState<string[]>([]);

  // =========================================
  // TASK MANAGEMENT
  // =========================================

  const [
    tasks,
    setTasks,
  ] = useState<any[]>([]);

  const [
    loadingTasks,
    setLoadingTasks,
  ] = useState(false);

    const [
    taskComment,
    setTaskComment,
  ] = useState("");

  const [
    selectedTaskStatus,
    setSelectedTaskStatus,
  ] = useState("IN_PROGRESS");

  const [
    selectedTaskId,
    setSelectedTaskId,
  ] = useState("");

  const [taskStats, setTaskStats] =
  useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const [taskSearch, setTaskSearch] =
  useState("");

  const [taskStatusFilter, setTaskStatusFilter] =
    useState("ALL");

  const [taskPriorityFilter, setTaskPriorityFilter] =
    useState("ALL");


  const [facultyMap, setFacultyMap] =
  useState<any>({});

  const [classMap, setClassMap] =
    useState<any>({});

  const [expandedTaskId, setExpandedTaskId] =
  useState("");

  const [taskUpdates, setTaskUpdates] =
  useState<any>({});

  const [timelineUpdates, setTimelineUpdates] =
  useState<any[]>([]);

  const [taskClassFilter,
  setTaskClassFilter] =
  useState("ALL");

  // =========================================
  // Task Percentage for Analytics
  // =========================================
  const [
  taskPercentage,
  setTaskPercentage,
] = useState(0);

  // =========================================
  // COUNTS
  // =========================================

  const totalMessages =
    messages.length;

  const acknowledgedCount =
    acknowledgedMessages.length;

  const pendingCount =
    totalMessages -
    acknowledgedCount;

  // =========================================
  // FILTERED MESSAGES
  // =========================================

  const filteredMessages =
    messages

      .filter((msg) => {

        // SEARCH

        const matchesSearch =

          msg.title
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )

          ||

          msg.content
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        // CLASS / GROUP

        const matchesClassGroup =

          selectedClassGroup ===
          "ALL"

          ||

          `${msg?.classes?.name} ${msg?.classes?.section}`

          ===

          selectedClassGroup;

        // CATEGORY

        const matchesCategory =

          selectedCategory ===
          "ALL"

          ||

          msg
          ?.message_categories
          ?.name ===
          selectedCategory;

        // STATUS

        let status =
          "PENDING";

        if (
          acknowledgedMessages.includes(
            msg.id
          )
        ) {

          status =
            "ACKNOWLEDGED";
        }

        const matchesStatus =

          selectedStatus ===
          "ALL"

          ||

          status ===
          selectedStatus;

        return (

          matchesSearch
          &&
          matchesClassGroup
          &&
          matchesCategory
          &&
          matchesStatus
        );
      })

      .sort((a, b) => {

        if (
          sortOption ===
          "LATEST"
        ) {

          return (
            new Date(
              b.created_at
            ).getTime()

            -

            new Date(
              a.created_at
            ).getTime()
          );
        }

        if (
          sortOption ===
          "OLDEST"
        ) {

          return (
            new Date(
              a.created_at
            ).getTime()

            -

            new Date(
              b.created_at
            ).getTime()
          );
        }

        return 0;
      });

  // =========================================
  // CATEGORY COLOR
  // =========================================

  const getCategoryColor =
    (
      category: string
    ) => {

      switch (
        category
      ) {

        case "Exam":

          return "bg-red-100 text-red-700";

        case "Assignment":

          return "bg-blue-100 text-blue-700";

        case "Club":

          return "bg-purple-100 text-purple-700";

        case "Placement":

          return "bg-green-100 text-green-700";

        case "Attendance":

          return "bg-yellow-100 text-yellow-700";

        default:

          return "bg-gray-100 text-gray-700";
      }
    };

  // =========================================
  // MESSAGE STATUS
  // =========================================

  const getMessageStatus =
    (
      messageId: string
    ) => {

      if (
        acknowledgedMessages.includes(
          messageId
        )
      ) {

        return "ACKNOWLEDGED";
      }

      return "PENDING";
    };

  // =========================================
  // DEADLINE INFO
  // =========================================

  const getDeadlineInfo =
    (
      deadline: string
    ) => {

      if (!deadline) {

        return null;
      }

      const now =
        new Date();

      const deadlineDate =
        new Date(deadline);

      const diffTime =

        deadlineDate.getTime()

        -

        now.getTime();

      const diffDays =
        Math.ceil(

          diffTime /

          (
            1000 *
            60 *
            60 *
            24
          )
        );

      if (diffDays < 0) {

        return {

          text:
            `Deadline missed by ${Math.abs(diffDays)} day(s)`,

          color:
            "text-red-600",
        };
      }

      if (diffDays <= 2) {

        return {

          text:
            `Deadline in ${diffDays} day(s)`,

          color:
            "text-orange-600",
        };
      }

      return {

        text:
          `Deadline in ${diffDays} day(s)`,

        color:
          "text-green-600",
      };
    };

  // =========================================
  // LOAD USER
  // =========================================

    useEffect(() => {

  checkUserStatus();

  const interval =
    setInterval(() => {

      checkUserStatus();

    }, 10000);

  return () =>
    clearInterval(interval);

}, []);

  useEffect(() => {

    const loadUser =
      async () => {

        const {
          data: { user },
        } = await supabase
          .auth
          .getUser();

        if (!user) {

          window.location.href =
            "/login";

          return;
        }

        setEmail(
          user.email || ""
        );

        const { data } =
          await supabase
            .from("profiles")
            .select("*")
            .eq(
              "id",
              user.id
            )
            .single();

        if (!data) {

          alert(
            "Profile not found"
          );

          return;
        }

        if (
          data.role !==
          "STUDENT"
        ) {

          alert(
            "Access Denied"
          );

          window.location.href =
            "/dashboard";

          return;
        }

        setProfile(data);

        setFullName(
          data.full_name || ""
        );

        setMobileNumber(
          data.mobile_number || ""
        );

        setAddress(
          data.address || ""
        );

        fetchStudentClasses(
          data.id
        );

        fetchAcknowledgedMessages(
          data.id
        );
        fetchTasks(data.id);
        fetchFacultyMap();
        fetchClassMap();
      };

    loadUser();

  }, []);

  // =========================================
  // FETCH CLASSES
  // =========================================

  const fetchStudentClasses =
    async (
      studentId: string
    ) => {

      const { data } =
        await supabase

          .from("class_members")

          .select("class_id")

          .eq(
            "student_id",
            studentId
          );

      if (data) {

        const ids =
          data.map(
            (item) =>
              item.class_id
          );

        setClassIds(ids);

        fetchMessages(ids);
      }
    };

  // =========================================
  // FETCH MESSAGES
  // =========================================

  const fetchMessages =
    async (
      ids: string[]
    ) => {

      if (ids.length === 0) {

        return;
      }

      const { data } =
        await supabase

          .from("messages")

          .select(`
            *,
            message_categories(
              name
            ),
            profiles(
              full_name,
              email
            ),
            classes(
              name,
              section
            )
          `)

          .in(
            "class_id",
            ids
          )

          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (data) {

        setMessages(data);
      }
    };

  // =========================================
  // FETCH TASKS
  // =========================================

  const fetchTasks =
  async (
    studentId: string
  ) => {

    if (!studentId) return;

      setLoadingTasks(true);
      console.log(profile);
      const {
        data,
        error,
      } = await supabase

        .from("tasks")

        .select("*")

        .eq(
          "assigned_to",
          studentId
        )

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        console.log(error);

        setLoadingTasks(false);

        return;
      }

      const taskData =
        data || [];

      setTasks(taskData);

      calculateTaskStats(
        taskData
      );

      setLoadingTasks(false);
    };
  // =========================================
  // FETCH FACULTY MAP
  // =========================================
    const fetchFacultyMap =
    async () => {

    const {
      data,
      error,
    } = await supabase

      .from("profiles")

      .select(`
        id,
        full_name
      `);

    if (error) {

      console.log(error);

      return;
    }

    const map: any = {};

    data?.forEach(
      (faculty) => {

        map[
          faculty.id
        ] = faculty;
      }
    );

    setFacultyMap(map);
  };

  // =========================================
  // FETCH CLASS MAP
  // =========================================

  const fetchClassMap =
  async () => {

    const {
      data,
      error,
    } = await supabase

      .from("classes")

      .select(`
        id,
        name,
        section
      `);

    if (error) {

      console.log(error);

      return;
    }

    const map: any = {};

    data?.forEach(
      (cls) => {

        map[
          cls.id
        ] = cls;
      }
    );

    setClassMap(map);
  };

  // =========================================
  // Statistics Function
  // =========================================
      const calculateTaskStats =
      (tasks: any[]) => {

        const total =
          tasks.length;

        const completed =
          tasks.filter(
            (task) =>
              task.status ===
              "COMPLETED"
          ).length;

        const pending =
          tasks.filter(
            (task) =>
              task.status !==
              "COMPLETED"
          ).length;

        setTaskStats({
          total,
          completed,
          pending,
        });
      };

  // =========================================
  // FETCH ACKNOWLEDGED
  // =========================================

  const fetchAcknowledgedMessages =
    async (
      userId: string
    ) => {

      const { data } =
        await supabase

          .from(
            "message_acknowledgements"
          )

          .select("message_id")

          .eq(
            "user_id",
            userId
          );

      if (data) {

        const ids =
          data.map(
            (item) =>
              item.message_id
          );

        setAcknowledgedMessages(
          ids
        );
      }
    };

  // =========================================
  // ACKNOWLEDGE
  // =========================================

  const handleAcknowledge =
    async (
      messageId: string
    ) => {

      if (
        acknowledgedMessages.includes(
          messageId
        )
      ) {

        return;
      }

      const message =
        messages.find(
          (msg) =>
            msg.id ===
            messageId
        );

      let beforeDeadline =
        false;

      if (
        message
        ?.acknowledgement_deadline
      ) {

        beforeDeadline =

          new Date()

          <=

          new Date(
            message
            .acknowledgement_deadline
          );
      }

      const { error } =
        await supabase

          .from(
            "message_acknowledgements"
          )

          .insert([
            {

              message_id:
                messageId,

              user_id:
                profile.id,

              acknowledged:
                true,

              acknowledged_at:
                new Date().toISOString(),

              before_deadline:
                beforeDeadline,
            },
          ]);

      if (error) {

        alert(error.message);

        return;
      }

      setAcknowledgedMessages([
        ...acknowledgedMessages,
        messageId,
      ]);

      alert(
        "Acknowledged successfully"
      );
    };

  // =========================================
  // FETCH TASK TIMELINE
  // =========================================

    const fetchTaskTimeline =
    async (
      taskId: string
    ) => {

    const {
      data,
      error,
    } = await supabase

      .from(
        "task_updates"
      )

      .select("*")

      .eq(
        "task_id",
        taskId
      )

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {

      console.log(
        error
      );

      return;
    }

    setTimelineUpdates(
      data || []
    );
  };
  // =========================================
  // TASK UPDATE
  // =========================================

  const handleTaskUpdate =
    async (
      taskId: string
    ) => {

      if (!taskComment) {

        alert(
          "Please enter progress update"
        );

        return;
      }

      // INSERT UPDATE

      const {
        error: updateError,
      } = await supabase

        .from("task_updates")

        .insert([
        {
          task_id: taskId,

          updated_by: profile.id,

          status: selectedTaskStatus,

          progress_percentage:
            taskPercentage,

          progress_comment:
            taskComment,
        },
        ]);

      if (updateError) {

        alert(
          updateError.message
        );

        return;
      }

      // UPDATE TASK STATUS

      const {
        error: taskError,
      } = await supabase

        .from("tasks")

        .update({
          status:
            selectedTaskStatus,

          current_progress:
            taskPercentage
        })

        .eq(
          "id",
          taskId
        );

      if (taskError) {

        alert(
          taskError.message
        );

        return;
      }

      alert(
        "Task updated successfully"
      );

      // RESET

      setTaskComment("");

      setSelectedTaskStatus(
        "IN_PROGRESS"
      );

      setSelectedTaskId("");

      // REFRESH TASKS

      fetchTasks(
        profile.id
      );
    };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout =
    async () => {

      await supabase
        .auth
        .signOut();

      window.location.href =
        "/login";
    };

  // =========================================
  // UPDATE PROFILE
  // =========================================

  const handleUpdateProfile =
    async () => {

      const { error } =
        await supabase

          .from("profiles")

          .update({

            full_name:
              fullName,

            mobile_number:
              mobileNumber,

            address:
              address,
          })

          .eq(
            "id",
            profile.id
          );

      if (error) {

        alert(error.message);

        return;
      }

      setProfile({
        ...profile,
        full_name: fullName,
        mobile_number: mobileNumber,
        address: address,
      });

      alert(
        "Profile updated successfully"
      );

      setShowProfileModal(
        false
      );
    };
    // =========================================
    // FILTERED TASKS
    // =========================================

      const filteredTasks =
        tasks.filter(
          (task: any) => {

            const matchesSearch =

              task.title
                ?.toLowerCase()
                .includes(
                  taskSearch
                    .toLowerCase()
                );

            const matchesClass =

              taskClassFilter ===
              "ALL"

              ||

              task.class_id ===
              taskClassFilter;

            const matchesStatus =

              taskStatusFilter ===
              "ALL"

              ||

              task.status ===
              taskStatusFilter;

            const matchesPriority =

              taskPriorityFilter ===
              "ALL"

              ||

              task.priority ===
              taskPriorityFilter;

            return (

              matchesSearch

              &&

              matchesClass

              &&

              matchesStatus

              &&

              matchesPriority
            );
          }
        );

  // =========================================
  // UI
  // =========================================

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-72 bg-gray-900 text-white shadow-lg">

        {/* LOGO */}

        <div className="border-b border-gray-700 p-6 text-center">

          <img
            src="/logo.png"
            alt="University Logo"
            className="mx-auto mb-3 h-20 w-20 object-contain"
          />

          <h2 className="text-xl font-bold">

            Campus Workspace

          </h2>

        </div>

        {/* MENU */}

        <div className="mt-5 flex flex-col gap-2 px-4">

          {/* HOME */}

          <button
            onClick={() =>
              setActiveModule(
                "HOME"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
              "HOME"

                ? "bg-blue-600"

                : "hover:bg-gray-800"
            }`}
          >

            Home

          </button>

          {/* INBOX */}

          <button
            onClick={() =>
              setActiveModule(
                "INBOX"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
              "INBOX"

                ? "bg-blue-600"

                : "hover:bg-gray-800"
            }`}
          >

            Inbox

          </button>

          {/* TASKS */}

          <button
            onClick={() =>
              setActiveModule(
                "TASKS"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
              "TASKS"

                ? "bg-blue-600"

                : "hover:bg-gray-800"
            }`}
          >

            Task Management

          </button>
                    {/* EVENTS */}

          <button
            onClick={() =>
              setActiveModule(
                "EVENTS"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
              "EVENTS"

                ? "bg-blue-600"

                : "hover:bg-gray-800"
            }`}
          >

            Event Management

          </button>

          {/* ANALYTICS */}

          <button
            onClick={() =>
              setActiveModule(
                "ANALYTICS"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
              "ANALYTICS"

                ? "bg-blue-600"

                : "hover:bg-gray-800"
            }`}
          >

            Analytics

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 rounded border bg-white p-5 shadow md:flex-row md:items-center md:justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <img
              src="/logo.png"
              alt="University Logo"
              className="h-16 w-16 object-contain"
            />

            <div>

              <h1 className="text-3xl font-bold text-gray-800">

                Student Dashboard

              </h1>

              <p className="text-sm text-gray-500">

                Institutional Communication Portal

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <div className="text-right">

              <p className="font-semibold text-gray-800">

                {
                  fullName ||
                  "Student"
                }

              </p>

              <p className="text-sm text-gray-500">

                {email}

              </p>

            </div>

            {/* PROFILE */}

            <button
              onClick={() =>
                setShowProfileModal(
                  true
                )
              }
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >

              Profile

            </button>

            {/* LOGOUT */}

            <button
              onClick={
                handleLogout
              }
              className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            >

              Logout

            </button>

          </div>

        </div>

        {/* HOME */}

        {
          activeModule ===
          "HOME" && (

          <div
            className="flex min-h-[75vh] items-end justify-center pb-1 rounded-xl bg-cover bg-center shadow-lg"
            style={{
              backgroundImage:
                "url('/campus.jpeg')",
            }}
          >

            <div className="mb-6 rounded-2xl bg-white/10 px-10 py-8 text-center text-black shadow-xl">

              <h1 className="mb-4 text-5xl font-bold">

                Welcome

              </h1>

              <p className="mb-6 text-xl">

                Campus Communication &
                Collaboration Platform

              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="rounded-lg bg-white bg-opacity-20 p-6">

                  <h2 className="text-3xl font-bold">

                    {
                      pendingCount
                    }

                  </h2>

                  <p className="mt-2">

                    Pending Messages

                  </p>

                </div>

                <div className="rounded-lg bg-white bg-opacity-20 p-6">

                  <h2 className="text-3xl font-bold">

                    Coming Soon

                  </h2>

                  <p className="mt-2">

                    Tasks

                  </p>

                </div>

                <div className="rounded-lg bg-white bg-opacity-20 p-6">

                  <h2 className="text-3xl font-bold">

                    Coming Soon

                  </h2>

                  <p className="mt-2">

                    Events

                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* INBOX */}

        {
          activeModule ===
          "INBOX" && (

          <>

          {/* DASHBOARD STATS */}

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* TOTAL */}

            <div className="rounded border bg-blue-100 p-6">

              <h2 className="text-lg font-bold">

                Messages Received

              </h2>

              <p className="mt-2 text-4xl font-bold text-blue-700">

                {totalMessages}

              </p>

            </div>

            {/* ACKNOWLEDGED */}

            <div className="rounded border bg-green-100 p-6">

              <h2 className="text-lg font-bold">

                Messages Acknowledged

              </h2>

              <p className="mt-2 text-4xl font-bold text-green-700">

                {acknowledgedCount}

              </p>

            </div>

            {/* PENDING */}

            <div className="rounded border bg-red-100 p-6">

              <h2 className="text-lg font-bold">

                Pending Acknowledgement

              </h2>

              <p className="mt-2 text-4xl font-bold text-red-700">

                {pendingCount}

              </p>

            </div>

          </div>

          {/* FILTER BAR */}

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="rounded border p-2"
            />

            {/* CLASS */}

            <select
              value={selectedClassGroup}
              onChange={(e) =>
                setSelectedClassGroup(
                  e.target.value
                )
              }
              className="rounded border p-2"
            >

              <option value="ALL">

                All Classes / Groups

              </option>

              {
                [
                  ...new Set(
                    messages.map(
                      (msg) =>

                        `${msg?.classes?.name} ${msg?.classes?.section}`
                    )
                  )
                ].map(
                  (
                    group: any,
                    index
                  ) => (

                    <option
                      key={index}
                      value={group}
                    >

                      {group}

                    </option>

                  ))
              }

            </select>

            {/* CATEGORY */}

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="rounded border p-2"
            >

              <option value="ALL">

                All Categories

              </option>

              {
                [
                  ...new Set(
                    filteredMessages.map(
                      (msg) =>
                        msg
                        ?.message_categories
                        ?.name
                    )
                  )
                ].map(
                  (
                    category: any,
                    index
                  ) => (

                    <option
                      key={index}
                      value={category}
                    >

                      {category}

                    </option>

                  ))
              }

            </select>

            {/* STATUS */}

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value
                )
              }
              className="rounded border p-2"
            >

              <option value="ALL">

                All Status

              </option>

              <option value="PENDING">

                Pending

              </option>

              <option value="ACKNOWLEDGED">

                Acknowledged

              </option>

            </select>

            {/* SORT */}

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value
                )
              }
              className="rounded border p-2"
            >

              <option value="LATEST">

                Latest First

              </option>

              <option value="OLDEST">

                Oldest First

              </option>

            </select>

          </div>
          
          {/* MESSAGE CARDS */}

          <div className="space-y-5">

            {
              filteredMessages.map(
                (msg) => {

                  const status =
                    getMessageStatus(
                      msg.id
                    );

                  const deadlineInfo =
                    getDeadlineInfo(
                      msg.acknowledgement_deadline
                    );

                  return (

                    <div
                      key={msg.id}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl"
                    >

                      {/* CARD HEADER */}

                      <div
                        className="cursor-pointer p-5"
                        onClick={() =>

                          setExpandedMessageId(

                            expandedMessageId ===
                            msg.id

                              ? ""

                              : msg.id
                          )
                        }
                      >

                        {/* TOP ROW */}

                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                          {/* TITLE */}

                          <div>

                            <h2 className="text-2xl font-bold text-blue-700">

                              {msg.title}

                            </h2>

                          </div>

                          {/* STATUS */}

                          <div>

                            {
                              status ===
                              "ACKNOWLEDGED"

                                ?

                                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                  Acknowledged

                                </span>

                                :

                                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                  Pending

                                </span>
                            }

                          </div>

                        </div>

                        {/* SECOND ROW */}

                        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-4">

                          {/* CLASS */}

                          <div>

                            <p className="font-semibold text-gray-500">

                              Class / Group

                            </p>

                            <p>

                              {
                                msg?.classes?.name
                              }{" "}

                              {
                                msg?.classes?.section
                              }

                            </p>

                          </div>

                          {/* CATEGORY */}

                          <div>

                            <p className="font-semibold text-gray-500">

                              Category

                            </p>

                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(
                                msg
                                ?.message_categories
                                ?.name
                              )}`}
                            >

                              {
                                msg
                                ?.message_categories
                                ?.name
                              }

                            </span>

                          </div>

                          {/* FACULTY */}

                          <div>

                            <p className="font-semibold text-gray-500">

                              Faculty

                            </p>

                            <p>

                              {
                                msg?.profiles
                                ?.full_name
                              }

                            </p>

                          </div>

                          {/* POSTED */}

                          <div>

                            <p className="font-semibold text-gray-500">

                              Posted

                            </p>

                            <p>

                              {
                                new Date(
                                  msg.created_at
                                ).toLocaleString()
                              }

                            </p>

                          </div>

                        </div>

                        {/* THIRD ROW */}

                        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                          {/* DEADLINE */}

                          <div>

                            <span className="font-semibold text-gray-600">

                              Deadline :

                            </span>{" "}

                            {
                              msg.acknowledgement_deadline

                                ?

                                new Date(
                                  msg.acknowledgement_deadline
                                ).toLocaleString()

                                :

                                "--"
                            }

                          </div>

                          {/* EXPAND BUTTON */}

                          <div className="text-blue-600 font-semibold">

                            {
                              expandedMessageId ===
                              msg.id

                                ?

                                "Hide Details ▲"

                                :

                                "View Details ▼"
                            }

                          </div>

                        </div>

                      </div>

                      {/* EXPANDED CONTENT */}

                      {
                        expandedMessageId ===
                        msg.id && (

                        <div className="border-t bg-gray-50 p-6">

                          {/* MESSAGE */}

                          <div className="whitespace-pre-wrap text-gray-800">

                            {msg.content}

                          </div>

                          {/* DEADLINE INFO */}

                          {
                            deadlineInfo && (

                              <div
                                className={`mt-4 font-semibold ${deadlineInfo.color}`}
                              >

                                {
                                  deadlineInfo.text
                                }

                              </div>
                            )
                          }

                          {/* ACTIONS */}

                          <div className="mt-6">

                            {
                              acknowledgedMessages.includes(
                                msg.id
                              )

                                ?

                                <button
                                  disabled
                                  className="rounded-xl bg-green-600 px-6 py-3 text-white opacity-80"
                                >

                                  Acknowledged

                                </button>

                                :

                                <button
                                  onClick={() =>
                                    handleAcknowledge(
                                      msg.id
                                    )
                                  }
                                  className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                                >

                                  Acknowledge Message

                                </button>
                            }

                          </div>

                        </div>
                      )}

                    </div>
                  );
                }
              )
            }

          </div>

          </>

        )}

        {/* TASK MANAGEMENT */}

        {
          activeModule ===
          "TASKS" && (

          <div className="rounded-2xl bg-white p-8 shadow-lg">

            {/* HEADER */}
            
             <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

              <div className="rounded-2xl border bg-blue-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Total Tasks

                </h3>

                <p className="mt-2 text-4xl font-bold text-blue-600">

                  {taskStats.total}

                </p>

              </div>

              <div className="rounded-2xl border bg-green-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Completed Tasks

                </h3>

                <p className="mt-2 text-4xl font-bold text-green-600">

                  {taskStats.completed}

                </p>

              </div>

              <div className="rounded-2xl border bg-red-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Pending Tasks

                </h3>

                <p className="mt-2 text-4xl font-bold text-red-600">

                  {taskStats.pending}

                </p>

              </div>

            </div>

            {/* FILTER BAR */}

            <div className="mb-6 rounded-2xl border bg-gray-50 p-5">

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                {/* SEARCH */}

                <input
                  type="text"
                  placeholder="Search Tasks..."
                  value={taskSearch}
                  onChange={(e) =>
                    setTaskSearch(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                />

                {/* CLASS */}

                <select
                  value={
                    taskClassFilter
                  }
                  onChange={(e) =>
                    setTaskClassFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">

                    All Classes

                  </option>

                  {
                    Object.values(
                      classMap
                    ).map(
                      (cls: any) => (

                        <option
                          key={cls.id}
                          value={cls.id}
                        >

                          {cls.name} - {cls.section}

                        </option>
                      )
                    )
                  }

                </select>

                {/* STATUS */}

                <select
                  value={
                    taskStatusFilter
                  }
                  onChange={(e) =>
                    setTaskStatusFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">

                    All Status

                  </option>

                  <option value="NOT_STARTED">

                    NOT_STARTED

                  </option>

                  <option value="IN_PROGRESS">

                    IN_PROGRESS

                  </option>

                  <option value="COMPLETED">

                    COMPLETED

                  </option>

                  <option value="BLOCKED">

                    BLOCKED

                  </option>

                </select>

                {/* PRIORITY */}

                <select
                  value={
                    taskPriorityFilter
                  }
                  onChange={(e) =>
                    setTaskPriorityFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">

                    All Priority

                  </option>

                  <option value="HIGH">

                    HIGH

                  </option>

                  <option value="MEDIUM">

                    MEDIUM

                  </option>

                  <option value="LOW">

                    LOW

                  </option>

                </select>

              </div>

            </div>


            {/* LOADING */}

            {
              loadingTasks && (

              <div className="py-20 text-center text-lg font-semibold text-gray-500">

                Loading tasks...

              </div>
            )}

            {/* EMPTY STATE */}

            {
              !loadingTasks &&

              tasks.length === 0 && (

              <div className="flex min-h-[50vh] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">

                <div className="text-center">

                  <h2 className="text-3xl font-bold text-gray-700">

                    No Tasks Assigned

                  </h2>

                  <p className="mt-2 text-gray-500">

                    Tasks assigned by faculty will appear here

                  </p>

                </div>

              </div>
            )}

            {/* TASK LIST */}

             <div className="space-y-6">

              {
                filteredTasks.map(
                  (
                    task: any
                  ) => (

                    <div
                      key={task.id}
                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >

                      {/* TOP */}

                      <div className="mb-4 flex items-start justify-between">

                        <div>

                          <h2 className="text-2xl font-bold text-blue-700">

                            {
                              task.title
                            }

                          </h2>
                          <p className="mt-1 text-sm text-gray-500">

                            Created:
                            {" "}

                            {
                              new Date(
                                task.created_at
                              ).toLocaleString()
                            }

                          </p>

                        </div>

                        <div>

                          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800">

                            {
                              task.status
                            }

                          </span>

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="grid gap-4 md:grid-cols-5">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">

                              Assigned By

                            </p>

                            <p className="mt-1 text-lg font-bold text-gray-800">

                              {
                                facultyMap[
                                  task.assigned_by
                                ]?.full_name
                                || "--"
                              }

                            </p>

                          </div>

                          <div>

                            <p className="text-sm font-semibold text-gray-500">

                              Class

                            </p>

                            <p className="mt-1 text-lg font-bold text-gray-800">

                              {
                                classMap[
                                  task.class_id
                                ]

                                  ?

                                  `${classMap[task.class_id].name} - ${classMap[task.class_id].section}`

                                  :

                                  "--"
                                  
                              }

                            </p>

                          </div>

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Priority

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                              task.priority
                            }

                          </p>

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Deadline

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                              new Date(
                                task.deadline
                              ).toLocaleString()
                            }

                          </p>

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Current Status

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                              task.status
                            }

                          </p>

                        </div>

                      </div>

                      <div className="mt-4">

                      <div className="flex justify-between">

                        <span>

                          Progress

                        </span>

                        <span>

                          {
                            task.current_progress || 0
                          }%

                        </span>

                      </div>

                      <div className="mt-2 h-3 rounded-full bg-gray-200">

                        <div
                          className="h-3 rounded-full bg-green-600"
                          style={{
                            width:
                            `${task.current_progress || 0}%`
                          }}
                        />

                      </div>

                    </div>
                  {
                    expandedTaskId === task.id && (
                    <>
                      {/* DESCRIPTION */}

                      <div className="mt-6 rounded-xl bg-gray-50 p-4">

                        <p className="mb-2 text-sm font-semibold text-gray-500">

                          Description

                        </p>

                        <p className="whitespace-pre-line text-gray-700">

                          {
                            task.description
                          }

                        </p>

                      </div>
                                            {/* UPDATE TASK */}

                      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">

                        <h3 className="mb-4 text-xl font-bold text-blue-700">

                          Update Progress

                        </h3>

                        {/* STATUS */}

                        <div className="mb-4">

                          <label className="mb-2 block font-semibold text-gray-700">

                            Task Status

                          </label>

                          <select
                            value={
                              selectedTaskId ===
                              task.id

                                ?

                                selectedTaskStatus

                                :

                                "IN_PROGRESS"
                            }
                            onChange={(e) => {

                              setSelectedTaskId(
                                task.id
                              );

                              setSelectedTaskStatus(
                                e.target.value
                              );
                            }}
                            className="w-full rounded-xl border p-3"
                          >

                            <option value="IN_PROGRESS">

                              IN_PROGRESS

                            </option>

                            <option value="COMPLETED">

                              COMPLETED

                            </option>

                            <option value="BLOCKED">

                              BLOCKED

                            </option>

                          </select>

                        </div>

                        {/* COMMENT */}

                        <div className="mb-4">

                          <label className="mb-2 block font-semibold text-gray-700">

                            Daily Progress Update

                          </label>

                          <textarea
                            rows={4}
                            placeholder="Write your daily work update..."
                            value={
                              selectedTaskId ===
                              task.id

                                ?

                                taskComment

                                :

                                ""
                            }
                            onChange={(e) => {

                              setSelectedTaskId(
                                task.id
                              );

                              setTaskComment(
                                e.target.value
                              );
                            }}
                            className="w-full rounded-xl border p-3"
                          />

                        </div>
                       
                        {/*// TASK PERCENTAGE */}
                      
                        <div className="mb-4">

                          <label className="mb-2 block font-semibold text-gray-700">

                            Progress Percentage

                          </label>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={taskPercentage}
                            onChange={(e)=>
                              setTaskPercentage(
                                Number(e.target.value)
                              )
                            }
                            className="w-full rounded-xl border p-3"
                          />
                          

                        </div>

                        {/* BUTTON */}

                        <button
                          onClick={() =>
                            handleTaskUpdate(
                              task.id
                            )
                          }
                          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >

                          Submit Progress Update

                        </button>

                      </div>
                  
{/* =========================================
   STUDENT PROGRESS TIMELINE
========================================= */}

<div className="mt-8">

  <h3 className="mb-4 text-xl font-bold text-gray-800">

    Progress Timeline

  </h3>

  {
    timelineUpdates.length === 0 && (

      <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center text-gray-500">

        No progress updates yet

      </div>
    )
  }

  {
    timelineUpdates.map(
      (
        update: any
      ) => (

        <div
          key={
            update.id
          }
          className="mb-4 rounded-xl border-l-4 border-blue-500 bg-white p-4 shadow-sm"
        >

          <div className="mb-2 flex items-center justify-between">

            <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

              {
                update.status
              }

            </span>

            <span className="text-sm text-gray-500">

              {
                new Date(
                  update.created_at + "Z"
                ).toLocaleString(
                  "en-IN",
                  {
                    timeZone:
                      "Asia/Kolkata"
                  }
                )
              }

            </span>

          </div>

          <p className="whitespace-pre-wrap text-gray-700">

            {
              update.progress_comment
            }

          </p>

        </div>
      )
    )
  }

</div>
  </>
 )
}
<button
  onClick={async () => {

    if (
      expandedTaskId === task.id
    ) {

      setExpandedTaskId("");

    } else {

      setExpandedTaskId(
        task.id
      );

      await fetchTaskTimeline(
        task.id
      );
    }
  }}
  className="font-semibold text-blue-600"
>

  {
    expandedTaskId === task.id
      ? "Hide Details ▲"
      : "View Details ▼"
  }

</button>
                    </div>
                  )
                )
              }

            </div>

          </div>
        )}

        {/* EVENTS */}

        {
          activeModule ===
          "EVENTS" && (

          <div className="flex min-h-[70vh] items-center justify-center rounded-xl bg-white shadow">

            <div className="text-center">

              <h1 className="mb-4 text-5xl font-bold text-gray-800">

                Event Management

              </h1>

              <p className="text-xl text-gray-500">

                Coming Soon

              </p>

            </div>

          </div>
        )}

        {/* ANALYTICS */}

        {
          activeModule ===
          "ANALYTICS" && (

          <div className="flex min-h-[70vh] items-center justify-center rounded-xl bg-white shadow">

            <div className="text-center">

              <h1 className="mb-4 text-5xl font-bold text-gray-800">

                Analytics

              </h1>

              <p className="text-xl text-gray-500">

                Coming Soon

              </p>

            </div>

          </div>
        )}

      </div>

      {/* PROFILE MODAL */}

      {
        showProfileModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

          <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">

              Edit Profile

            </h2>

            <div className="mb-4">

              <label className="mb-1 block font-semibold text-gray-700">

                Enrollment Number

              </label>

              <input
                type="text"
                value={profile?.enrollment_number || ""}
                disabled
                className="w-full rounded border bg-gray-100 p-3 text-gray-600"
              />

            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              className="mb-4 w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(
                  e.target.value
                )
              }
              className="mb-4 w-full rounded border p-3"
            />

            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              className="mb-4 w-full rounded border p-3"
              rows={4}
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowProfileModal(
                    false
                  )
                }
                className="rounded bg-gray-400 px-4 py-2 text-white"
              >

                Cancel

              </button>

              <button
                onClick={
                  handleUpdateProfile
                }
                className="rounded bg-green-600 px-4 py-2 text-white"
              >

                Save

              </button>

            </div>

          </div>

        </div>
      )}

    </div>

  );
}