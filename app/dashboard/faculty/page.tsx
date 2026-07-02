"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils/dateTime";

import { supabase } from "@/lib/supabase-client";
import { checkUserStatus } from "@/lib/checkUserStatus";
import HomeSection from "@/dashboard/faculty/components/HomeSection";
import GroupsSection from "@/dashboard/faculty/components/GroupsSection";
import CategorySection from "@/dashboard/faculty/components/CategorySection";
import MessageSection from "@/dashboard/faculty/components/MessageSection";
import AnalyticsSection from "@/dashboard/faculty/components/AnalyticsSection";
import ClassDashboardSection from "@/dashboard/faculty/components/ClassDashboardSection";
import TasksSection from "@/dashboard/faculty/components/TasksSection";
import EventsSection from "@/dashboard/faculty/components/EventsSection";
import TaskModal from "@/dashboard/faculty/components/TaskModal";
import PendingTasksModal from "@/dashboard/faculty/components/PendingTasksModal";
import ProfileModal from "@/dashboard/faculty/components/ProfileModal";

export default function
  FacultyDashboard() {

  const router =
    useRouter();

  // =========================================
  // USER
  // =========================================

  const [profile,
    setProfile] =
    useState<any>(null);

  const [email,
    setEmail] =
    useState("");

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

  const [
    selectedClassStudents,
    setSelectedClassStudents,
  ] = useState<any[]>([]);

  const [
    selectedClassName,
    setSelectedClassName,
  ] = useState("");

  const [
    showStudentsModal,
    setShowStudentsModal,
  ] = useState(false);

  const [
    showAnalyticsModal,
    setShowAnalyticsModal,
  ] = useState(false);

  const [
    analyticsModalTitle,
    setAnalyticsModalTitle,
  ] = useState("");


  // =========================================
  // DATA STATES
  // =========================================

  const [classes,
    setClasses] =
    useState<any[]>([]);

  const [sentMessages,
    setSentMessages] =
    useState<any[]>([]);

  const [analytics,
    setAnalytics] =
    useState<any>({});

  //Test
  // =========================================
  // TASK MANAGEMENT
  // =========================================

  const [
    tasks,
    setTasks,
  ] = useState<any[]>([]);

  const [
    showTaskModal,
    setShowTaskModal,
  ] = useState(false);

  const [
    taskTitle,
    setTaskTitle,
  ] = useState("");

  const [
    taskDescription,
    setTaskDescription,
  ] = useState("");

  const [
    selectedTaskClass,
    setSelectedTaskClass,
  ] = useState("");

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState("");

  const [
    taskDeadline,
    setTaskDeadline,
  ] = useState("");

  const [
    taskPriority,
    setTaskPriority,
  ] = useState("MEDIUM");

  const [
    classStudents,
    setClassStudents,
  ] = useState<any[]>([]);

  const [
    taskUpdates,
    setTaskUpdates,
  ] = useState<any>({});

  const [
    expandedTaskId,
    setExpandedTaskId,
  ] = useState("");

  const [
    loadingTasks,
    setLoadingTasks,
  ] = useState(false);

  const [
    studentAnalyticsList,
    setStudentAnalyticsList,
  ] = useState<any[]>([]);

  const [
    allStudentAnalytics,
    setAllStudentAnalytics,
  ] = useState<any>({});

  const [
    selectedAnalyticsType,
    setSelectedAnalyticsType,
  ] = useState("");

  const [
    selectedAnalyticsView,
    setSelectedAnalyticsView,
  ] = useState<any>({});

  // =========================================

  const [messageCategories,
    setMessageCategories] = useState<any[]>([]);

  const [analyticsCategories,
    setAnalyticsCategories] = useState<any[]>([]);
  // =========================================
  // ANALYTICS FILTERS
  // =========================================

  const [
    analyticsSearch,
    setAnalyticsSearch,
  ] = useState("");

  const [
    analyticsClassFilter,
    setAnalyticsClassFilter,
  ] = useState("ALL");

  const [
    analyticsCategoryFilter,
    setAnalyticsCategoryFilter,
  ] = useState("ALL");

  const [
    analyticsStatusFilter,
    setAnalyticsStatusFilter,
  ] = useState("ALL");

  const [
    analyticsSort,
    setAnalyticsSort,
  ] = useState("LATEST");

  const [
    expandedAnalyticsId,
    setExpandedAnalyticsId,
  ] = useState("");

  // =========================================
  // FORM STATES
  // =========================================

  const [
    categoryName,
    setCategoryName,
  ] = useState("");

  const [
    selectedClass,
    setSelectedClass,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [title,
    setTitle] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const [deadline,
    setDeadline] =
    useState("");

  const [studentNames, setStudentNames] =
    useState<any>({});

  const [classNames, setClassNames] =
    useState<any>({});

  const [showTimelineModal, setShowTimelineModal] =
    useState(false);

  const [timelineUpdates, setTimelineUpdates] =
    useState<any[]>([]);

  const [selectedTaskForTimeline, setSelectedTaskForTimeline] =
    useState<any>(null);

  const [taskSearch, setTaskSearch] =
    useState("");

  const [taskClassFilter, setTaskClassFilter] =
    useState("ALL");

  const [taskStudentFilter, setTaskStudentFilter] =
    useState("ALL");

  const [taskStatusFilter, setTaskStatusFilter] =
    useState("ALL");

  const [taskPriorityFilter, setTaskPriorityFilter] =
    useState("ALL");

  const [taskSortOption, setTaskSortOption] =
    useState("LATEST");

  // =========================================
  // CLASS DASHBOARD RELATED

  const [
    classDashboardData,
    setClassDashboardData,
  ] = useState<any[]>([]);

  const [
    dashboardLoading,
    setDashboardLoading,
  ] = useState(false);

  const [
    dashboardSearch,
    setDashboardSearch,
  ] = useState("");

  const [
    dashboardSortField,
    setDashboardSortField,
  ] = useState("enrollment_number");

  const [
    dashboardSortDirection,
    setDashboardSortDirection,
  ] = useState("asc");

  const [
    dashboardSummary,
    setDashboardSummary,
  ] = useState({
    totalStudents: 0,
    activeStudents: 0,
    freeStudents: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [
    dashboardClassFilter,
    setDashboardClassFilter,
  ] = useState("ALL");

  const [
    dashboardStudentFilter,
    setDashboardStudentFilter,
  ] = useState("");

  const [
    dashboardCompletedFilter,
    setDashboardCompletedFilter,
  ] = useState("ALL");

  const [
    dashboardPendingFilter,
    setDashboardPendingFilter,
  ] = useState("ALL");



  const [
    showPendingTasksModal,
    setShowPendingTasksModal,
  ] = useState(false);

  const [
    selectedStudentPendingTasks,
    setSelectedStudentPendingTasks,
  ] = useState<any[]>([]);

  const [
    selectedStudentName,
    setSelectedStudentName,
  ] = useState("");

  // CLASS DASHBOARD RELATED

  // =========================================
  // CLASS DASHBOARD RELATED
  // =========================================
  const loadClassDashboard =
    async () => {

      setDashboardLoading(
        true
      );

      try {

        // =====================================
        // GET STUDENTS FROM FACULTY CLASSES
        // =====================================

        const classIds =
          classes.map(
            (cls: any) =>
              cls.id
          );

        if (
          classIds.length === 0
        ) {

          setDashboardSummary({

            totalStudents: 0,

            activeStudents: 0,

            freeStudents: 0,

            totalTasks: 0,

            completedTasks: 0,

            pendingTasks: 0,

          });

          setClassDashboardData([]);

          setDashboardLoading(
            false
          );

          return;
        }

        // =====================================
        // GET CLASS MEMBERS
        // =====================================

        const {
          data: members,
          error: memberError,
        } = await supabase

          .from(
            "class_members"
          )

          .select(`
        student_id,
        class_id
      `)

          .in(
            "class_id",
            classIds
          );

        const memberMap: any = {};

        members?.forEach((m: any) => {

          memberMap[m.student_id] =
            m.class_id;

        });

        if (
          memberError
        ) {

          console.log(
            memberError
          );

          return;
        }

        const studentIds =
          [
            ...new Set(
              members?.map(
                (m: any) =>
                  m.student_id
              )
            )
          ];

        // =====================================
        // GET STUDENT DETAILS
        // =====================================

        const {
          data: students,
          error: studentError,
        } = await supabase

          .from(
            "profiles"
          )

          .select(`
        id,
        enrollment_number,
        full_name
      `)

          .in(
            "id",
            studentIds
          );

        if (
          studentError
        ) {

          console.log(
            studentError
          );

          return;
        }

        console.log(
          "STUDENTS"
        );

        console.log(
          students
        );

        const {
          data: allTasks,
          error: taskError,
        } = await supabase

          .from("tasks")

          .select("*")

          .in(
            "assigned_to",
            studentIds
          );

        if (taskError) {

          console.log(
            taskError
          );

          return;
        }

        // TEMPORARY DATA

        const dashboardRows =

          students?.map(
            (
              student: any
            ) => {

              const studentTasks =

                allTasks?.filter(
                  (
                    task: any
                  ) =>

                    task.assigned_to ===
                    student.id
                ) || [];

              const completedTasks =

                studentTasks.filter(
                  (
                    task: any
                  ) =>

                    task.status ===
                    "COMPLETED"
                ).length;

              const pendingTasks =

                studentTasks.filter(
                  (
                    task: any
                  ) =>

                    task.status !==
                    "COMPLETED"
                ).length;

              const totalProgress =

                studentTasks.reduce(
                  (
                    sum: number,
                    task: any
                  ) =>

                    sum +
                    (
                      task.current_progress
                      || 0
                    ),

                  0
                );

              const averageProgress =

                studentTasks.length > 0

                  ?

                  Math.round(
                    totalProgress /
                    studentTasks.length
                  )

                  :

                  0;

              return {

                student_id:
                  student.id,

                enrollment_number:
                  student.enrollment_number,

                student_name:
                  student.full_name,

                class_id:
                  memberMap[student.id] || "",

                total_messages: 0,

                acknowledged: 0,

                pending: 0,

                late: 0,

                total_tasks:
                  studentTasks.length,

                completed_tasks:
                  completedTasks,

                pending_tasks:
                  pendingTasks,

                average_progress:
                  averageProgress,
              };
            }
          ) || [];

        setClassDashboardData(
          dashboardRows
        );

        setDashboardSummary({

          totalStudents:
            dashboardRows.length,

          activeStudents:

            dashboardRows.filter(
              (row: any) =>

                row.total_tasks > 0
            ).length,

          freeStudents:

            dashboardRows.filter(
              (row: any) =>

                row.total_tasks === 0
            ).length,

          totalTasks:

            dashboardRows.reduce(
              (
                sum: number,
                row: any
              ) =>

                sum +
                row.total_tasks,

              0
            ),

          completedTasks:

            dashboardRows.reduce(
              (
                sum: number,
                row: any
              ) =>

                sum +
                row.completed_tasks,

              0
            ),

          pendingTasks:

            dashboardRows.reduce(
              (
                sum: number,
                row: any
              ) =>

                sum +
                row.pending_tasks,

              0
            ),

        });

      } catch (error) {

        console.log(
          error
        );

      }

      setDashboardLoading(
        false
      );
    };

  // =========================================
  // Click on Task will open Pending tasks modal with list of pending tasks for that student
  // =========================================

  const viewPendingTasks =
    (
      studentId: string,
      studentName: string
    ) => {

      const pendingTasks =

        tasks.filter(
          (task: any) =>

            task.assigned_to === studentId

            &&

            task.status !== "COMPLETED"
        );

      setSelectedStudentPendingTasks(
        pendingTasks
      );

      setSelectedStudentName(
        studentName
      );

      setShowPendingTasksModal(
        true
      );
    };
  // =========================================
  // FILTERED ANALYTICS
  // =========================================

  const filteredAnalyticsMessages =

    sentMessages

      .filter((msg) => {

        // SEARCH

        const matchesSearch =

          msg.title
            ?.toLowerCase()
            .includes(
              analyticsSearch.toLowerCase()
            )

          ||

          msg.content
            ?.toLowerCase()
            .includes(
              analyticsSearch.toLowerCase()
            );

        // CLASS FILTER

        const matchesClass =

          analyticsClassFilter ===
          "ALL"

          ||

          msg.class_id ===
          analyticsClassFilter;

        // CATEGORY FILTER

        const matchesCategory =

          analyticsCategoryFilter ===
          "ALL"

          ||

          msg.category_id ===
          analyticsCategoryFilter;

        // STATUS FILTER

        const stats =
          analytics[msg.id];

        let status =
          "PENDING";

        if (
          stats?.pending === 0
        ) {

          status =
            "COMPLETED";
        }

        const matchesStatus =

          analyticsStatusFilter ===
          "ALL"

          ||

          analyticsStatusFilter
          === status;




        return (

          matchesSearch
          &&
          matchesClass
          &&
          matchesCategory
          &&
          matchesStatus
        );
      })

      .sort((a, b) => {

        if (
          analyticsSort ===
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

        return (

          new Date(
            a.created_at
          ).getTime()

          -

          new Date(
            b.created_at
          ).getTime()
        );
      });

  // =========================================
  // AUTH CHECK
  // =========================================

  useEffect(() => {

    checkUser();

  }, []);

  // =========================================
  // CHECK ACCOUNT SUSPENDED OR BLOCKED
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
  // =========================================
  // CHECK USER
  // =========================================

  const checkUser =
    async () => {

      const {
        data: {
          user
        }
      } =
        await supabase.auth.getUser();

      if (!user) {

        router.push("/");

        return;
      }

      setEmail(
        user.email || ""
      );

      const {
        data
      } =
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

      setProfile(data);
      /*Following 4 lines added for debugging purposes --;*/

      console.log("USER AUTH ID");
      console.log(user.id);
      console.log("PROFILE ID");
      console.log(data.id);

      fetchTasks(data.id);
      fetchStudentNames();
      fetchClassNames();

      setFullName(
        data.full_name || ""
      );

      setMobileNumber(
        data.mobile_number || ""
      );

      setAddress(
        data.address || ""
      );

      fetchAssignedClasses(
        user.id
      );

      fetchSentMessages(
        data.id
      );

    };

  // =========================================
  // FETCH ASSIGNED CLASSES
  // =========================================

  const fetchAssignedClasses =
    async (
      facultyId: string
    ) => {

      const { data } =
        await supabase

          .from("classes")

          .select("*")

          .eq(
            "faculty_coordinator_id",
            facultyId
          );

      console.log("FACULTY ID");
      console.log(facultyId);

      console.log("CLASSES");
      console.log(data);

      if (data) {

        setClasses(data);
      }
    };
  // =========================================
  // FETCH ASSIGNED CLASSES STUDENTS
  // =========================================
  const fetchClassStudents =
    async (
      classId: string,
      className: string
    ) => {

      console.log("CLASS ID");
      console.log(classId);

      // FETCH MEMBERS

      const {
        data: members,
        error: memberError,
      } = await supabase

        .from("class_members")

        .select("student_id")

        .eq(
          "class_id",
          classId
        );

      console.log("MEMBERS");
      console.log(members);

      if (memberError) {

        alert(memberError.message);

        return;
      }

      if (!members || members.length === 0) {

        setSelectedClassStudents([]);

        setSelectedClassName(className);

        setShowStudentsModal(true);

        return;
      }

      // IDS

      const studentIds =
        members.map(
          (m: any) =>
            m.student_id
        );

      console.log("STUDENT IDS");
      console.log(studentIds);

      // FETCH STUDENT DETAILS

      const {
        data: students,
        error: studentError,
      } = await supabase

        .from("profiles")

        .select("*")

        .in(
          "id",
          studentIds
        );

      console.log("STUDENTS");
      console.log(students);

      if (studentError) {

        alert(studentError.message);

        return;
      }

      setSelectedClassStudents(
        students || []
      );

      setSelectedClassName(
        className
      );

      setShowStudentsModal(
        true
      );
    };

  // =========================================
  // FETCH STUDENTS FOR TASK ASSIGNMENT
  // =========================================

  const fetchTaskStudents =
    async (
      classId: string
    ) => {

      const {
        data: members,
        error: memberError,
      } = await supabase

        .from("class_members")

        .select("student_id")

        .eq(
          "class_id",
          classId
        );

      if (
        memberError
      ) {

        console.log(
          memberError
        );

        return;
      }

      const studentIds =

        members?.map(
          (m: any) =>
            m.student_id
        ) || [];

      if (
        studentIds.length === 0
      ) {

        setClassStudents([]);

        return;
      }

      const {
        data: students,
        error: studentError,
      } = await supabase

        .from("profiles")

        .select(`
          id,
          full_name,
          enrollment_number
        `)

        .in(
          "id",
          studentIds
        );

      if (
        studentError
      ) {

        console.log(
          studentError
        );

        return;
      }

      setClassStudents(
        students || []
      );
    };


  // =========================================
  // FETCH TASKS
  // =========================================

  const fetchTasks = async (
    facultyId: string
  ) => {

    setLoadingTasks(true);

    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .eq(
          "assigned_by",
          facultyId
        );

    console.log("FACULTY ID");
    console.log(facultyId);

    console.log("TASK DATA");
    console.log(data);

    console.log("TASK ERROR");
    console.log(error);

    if (error) {

      alert(error.message);

      setLoadingTasks(false);

      return;
    }

    setTasks(data || []);

    setLoadingTasks(false);
  };


  const fetchStudentNames =
    async () => {

      const {
        data,
        error,
      } = await supabase

        .from("profiles")

        .select(`
            id,
            full_name,
            enrollment_number
          `);

      if (error) {

        console.log(error);

        return;
      }

      const map: any = {};

      data?.forEach(
        (student) => {

          map[student.id] =
            student;
        }
      );

      setStudentNames(map);
    };


  const fetchClassNames =
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

          map[cls.id] = cls;
        }
      );

      setClassNames(map);
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

        alert(
          error.message
        );

        return;
      }

      setTimelineUpdates(
        data || []
      );
    };




  // =========================================
  // CREATE TASK
  // =========================================

  const handleCreateTask =
    async () => {

      if (
        !selectedTaskClass
      ) {

        alert(
          "Select class"
        );

        return;
      }

      if (
        !selectedStudent
      ) {

        alert(
          "Select student"
        );

        return;
      }

      if (!taskTitle) {

        alert(
          "Task title required"
        );

        return;
      }

      if (
        !taskDescription
      ) {

        alert(
          "Task description required"
        );

        return;
      }

      if (!taskDeadline) {

        alert(
          "Deadline required"
        );

        return;
      }

      const {
        error,
      } = await supabase

        .from("tasks")

        .insert([
          {

            title:
              taskTitle,

            description:
              taskDescription,

            class_id:
              selectedTaskClass,

            assigned_to:
              selectedStudent,

            assigned_by:
              profile.id,

            deadline:
              new Date(
                taskDeadline
              ).toISOString(),

            priority:
              taskPriority,

            status:
              "NOT_STARTED",
          },
        ]);

      if (error) {

        alert(
          error.message
        );

        return;
      }

      alert(
        "Task created successfully"
      );

      // REFRESH TASKS

      fetchTasks(
        profile.id
      );

      // RESET FORM

      setTaskTitle("");

      setTaskDescription("");

      setSelectedTaskClass("");

      setSelectedStudent("");

      setTaskDeadline("");

      setTaskPriority(
        "MEDIUM"
      );

      setShowTaskModal(
        false
      );
    };

  // =========================================
  // FETCH ANALYTICS CATEGORIES
  // =========================================
  const fetchAnalyticsCategories = async () => {

    const { data } = await supabase

      .from("message_categories")

      .select("*")

      .order("name");

    if (data) {

      setAnalyticsCategories(data || []);

    }

  };

  // =========================================
  // FETCH ANALYTICS
  // =========================================

  const fetchAnalytics =
    async (
      messageId: string,
      classId: string,
      msgDeadline: any
    ) => {

      // STUDENTS

      const {
        data: members,
        error: memberError,
      } = await supabase

        .from("class_members")

        .select("student_id")

        .eq(
          "class_id",
          classId
        );

      const memberMap: any = {};

      members?.forEach((m: any) => {

        memberMap[m.student_id] =
          m.class_id;

      });

      if (memberError) {

        console.log(memberError);

        return;
      }

      const studentIds =
        members?.map(
          (m: any) => m.student_id
        ) || [];

      const {
        data: students,
        error: studentError,
      } = await supabase

        .from("profiles")

        .select(`
      id,
      full_name,
      email,
      mobile_number,
      enrollment_number
    `)

        .in(
          "id",
          studentIds
        );

      if (studentError) {

        console.log(studentError);

        return;
      }

      const total =
        students?.length || 0;

      // ACKNOWLEDGEMENTS

      const {
        data: acknowledgements
      } = await supabase

        .from(
          "message_acknowledgements"
        )

        .select(`
        user_id,
        acknowledged,
        acknowledged_at,
        before_deadline,
        profiles (
          full_name,
          email,
          mobile_number,
          enrollment_number
        )
      `)

        .eq(
          "message_id",
          messageId
        );

      const acknowledged =
        acknowledgements

          ?.filter((ack: any) => {

            if (
              !ack.acknowledged_at
            ) {

              return false;
            }

            if (!msgDeadline) {

              return true;
            }

            return (

              new Date(
                ack.acknowledged_at
              ).getTime()

              <=

              new Date(
                msgDeadline
              ).getTime()
            );
          })

          .length || 0;

      const late =
        acknowledgements

          ?.filter((ack: any) => {

            if (
              !ack.acknowledged_at
            ) {

              return false;
            }

            if (!msgDeadline) {

              return false;
            }

            return (

              new Date(
                ack.acknowledged_at
              ).getTime()

              >

              new Date(
                msgDeadline
              ).getTime()
            );
          })

          .length || 0;

      const totalAcknowledged =
        acknowledged +
        late;

      const pending =
        total -
        totalAcknowledged;

      // SAVE COUNTS

      setAnalytics(
        (prev: any) => ({

          ...prev,

          [messageId]: {

            total,

            acknowledged,

            pending,

            late,

          },

        })
      );

      // FULL STUDENT LIST

      const finalList =
        students?.map(
          (student: any) => {

            const ack =
              acknowledgements?.find(
                (a: any) =>

                  a.user_id ===
                  student.id
              );

            let status =
              "Pending";

            if (ack) {

              if (
                msgDeadline &&
                ack.acknowledged_at
              ) {

                const ackTime =
                  new Date(
                    ack.acknowledged_at
                  ).getTime();

                const deadlineTime =
                  new Date(
                    msgDeadline
                  ).getTime();

                status =
                  ackTime <= deadlineTime
                    ? "Yes"
                    : "Late";

              } else {

                status = "Yes";
              }
            }

            return {

              enrollment_number:
                student.enrollment_number,

              name:
                student.full_name,

              email:
                student.email,

              mobile:
                student.mobile_number,

              acknowledgement:
                status,

              acknowledged_at:
                ack
                  ?.acknowledged_at
                || "--",

            };
          }
        ) || [];

      setAllStudentAnalytics(
        (prev: any) => ({

          ...prev,

          [messageId]:
            finalList,

        })
      );
    };

  // =========================================
  // CREATE CATEGORY
  // =========================================

  const handleCreateCategory =
    async () => {

      if (!selectedClass) {

        alert(
          "Please select a Group."
        );

        return;
      }

      if (!categoryName) {

        alert(
          "Category required"
        );

        return;
      }

      const { error } =
        await supabase

          .from(
            "message_categories"
          )

          .insert([
            {

              name:
                categoryName,

              class_id: selectedClass,

              created_by:
                profile.id,

            },
          ]);

      if (error) {

        alert(
          error.message
        );

        return;
      }

      alert(
        "Category created"
      );

      setCategoryName("");

      setSelectedClass("");

      fetchCategories(
        selectedClass
      );
    };

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  const fetchCategories =
    async (
      classId: string
    ) => {

      const {
        data,
        error,
      } = await supabase

        .from(
          "message_categories"
        )

        .select("*")

        .eq(
          "class_id",
          classId
        )

        .order(
          "name",
          {
            ascending: true,
          }
        );

      if (error) {

        console.log(error);

        return;

      }

      setMessageCategories(
        data || []
      );
    };

  // =========================================
  // FETCH SENT MESSAGES
  // =========================================

  const fetchSentMessages =
    async (
      facultyId: string
    ) => {

      const {
        data,
        error,
      } = await supabase

        .from("messages")

        .select("*")

        .eq(
          "sender_id",
          facultyId
        )

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        console.log(error);

        return;
      }

      setSentMessages(
        data || []
      );

      // LOAD ANALYTICS

      data?.forEach(
        (msg: any) => {

          fetchAnalytics(
            msg.id,
            msg.class_id,
            msg.acknowledgement_deadline
          );
        }
      );
    };

  // =========================================
  // SEND MESSAGE
  // =========================================

  const handleSendMessage =
    async () => {

      if (!selectedClass) {

        alert(
          "Select class"
        );

        return;
      }

      if (!selectedCategory) {

        alert(
          "Select category"
        );

        return;
      }

      if (!title) {

        alert(
          "Title required"
        );

        return;
      }

      if (!message) {

        alert(
          "Message required"
        );

        return;
      }

      const { error } =
        await supabase

          .from("messages")

          .insert([
            {

              institute_id:
                profile.institute_id,

              department_id:
                profile.department_id,

              sender_id:
                profile.id,

              class_id:
                selectedClass,

              category_id:
                selectedCategory,

              title:
                title,

              content:
                message,

              acknowledgement_required:
                true,

              acknowledgement_deadline:
                new Date(
                  deadline
                ).toISOString(),

              target_type:
                "CLASS",

            },
          ]);

      if (error) {

        alert(
          error.message
        );

        return;
      }

      alert(
        "Message sent successfully"
      );

      fetchSentMessages(
        profile.id
      );

      setSelectedClass("");

      setSelectedCategory("");

      setTitle("");

      setMessage("");

      setDeadline("");
    };

  // =========================================
  // LOAD STUDENT ANALYTICS
  // =========================================

  const loadStudentAnalytics =
    (
      messageId: string,
      type: string
    ) => {

      const allStudents =
        allStudentAnalytics[
        messageId
        ] || [];

      let filtered =
        allStudents;

      if (type === "ACKNOWLEDGED") {

        filtered =
          allStudents.filter(
            (s: any) =>
              s.acknowledgement
              === "Yes"
          );
      }

      if (type === "LATE") {

        filtered =
          allStudents.filter(
            (s: any) =>
              s.acknowledgement
              === "Late"
          );
      }

      if (type === "PENDING") {

        filtered =
          allStudents.filter(
            (s: any) =>
              s.acknowledgement
              === "Pending"
          );
      }

      setSelectedAnalyticsType(
        type
      );

      setAnalyticsModalTitle(
        type
      );

      setStudentAnalyticsList(
        filtered
      );

      setShowAnalyticsModal(
        true
      );
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

        alert(
          error.message
        );

        return;
      }

      setProfile({
        ...profile,
        full_name:
          fullName,
        mobile_number:
          mobileNumber,
        address:
          address,
      });

      alert(
        "Profile updated successfully"
      );

      setShowProfileModal(
        false
      );
    };


  const filteredTasks =
    tasks

      .filter(
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

          const matchesStudent =

            taskStudentFilter ===
            "ALL"

            ||

            task.assigned_to ===
            taskStudentFilter;

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

            matchesStudent

            &&

            matchesStatus

            &&

            matchesPriority
          );
        }
      )

      .sort(
        (
          a: any,
          b: any
        ) => {

          if (
            taskSortOption ===
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
            taskSortOption ===
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
        }
      );

  // =========================================
  // FILTERED DASHBOARD DATA
  const filteredDashboardData =

    classDashboardData.filter(
      (row: any) => {

        console.log("Selected Class:", dashboardClassFilter);
        console.log("Row Class:", row.class_name);

        /* CLASS FILTER */

        const matchesClass =

          dashboardClassFilter === "ALL"

          ||

          row.class_id ===
          dashboardClassFilter;

        /* STUDENT FILTER */

        const matchesStudent =

          !dashboardStudentFilter

          ||

          row.student_name
            ?.toLowerCase()
            .includes(
              dashboardStudentFilter.toLowerCase()
            );

        /* COMPLETED FILTER */

        const matchesCompleted =

          dashboardCompletedFilter === "ALL"

          ||

          (
            dashboardCompletedFilter === "YES"

            &&

            row.completed_tasks > 0
          )

          ||

          (
            dashboardCompletedFilter === "NO"

            &&

            row.completed_tasks === 0
          );

        /* PENDING FILTER */

        const matchesPending =

          dashboardPendingFilter === "ALL"

          ||

          (
            dashboardPendingFilter === "YES"

            &&

            row.pending_tasks > 0
          )

          ||

          (
            dashboardPendingFilter === "NO"

            &&

            row.pending_tasks === 0
          );

        return (

          matchesClass

          &&

          matchesStudent

          &&

          matchesCompleted

          &&

          matchesPending

        );
      }
    );






  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout =
    async () => {

      await supabase.auth.signOut();

      router.push("/");
    };


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

            Faculty Workspace

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
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "HOME"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Home

          </button>

          {/* CLASSES */}

          <button
            onClick={() =>
              setActiveModule(
                "CLASSES"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "CLASSES"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Assigned Classes

          </button>

          {/* CATEGORY */}

          <button
            onClick={() =>
              setActiveModule(
                "CATEGORY"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "CATEGORY"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Add Category

          </button>

          {/* MESSAGE */}

          <button
            onClick={() =>
              setActiveModule(
                "MESSAGE"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "MESSAGE"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Send Message

          </button>

          {/* ANALYTICS */}

          <button
            onClick={() => {

              setActiveModule("ANALYTICS");
              fetchAnalyticsCategories();
            }}
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "ANALYTICS"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Message Analytics

          </button>

          {/* TASKS */}

          <button
            onClick={() =>
              setActiveModule(
                "TASKS"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "TASKS"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Tasks

          </button>

          {/* CLASS_DASHBOARD */}

          <button
            onClick={() => {

              setActiveModule(
                "CLASS_DASHBOARD"
              );

              loadClassDashboard();

            }}
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "CLASS_DASHBOARD"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
              }`}
          >
            Class Dashboard
          </button>

          {/* EVENTS */}

          <button
            onClick={() =>
              setActiveModule(
                "EVENTS"
              )
            }
            className={`rounded px-4 py-3 text-left transition ${activeModule ===
              "EVENTS"

              ? "bg-blue-600"

              : "hover:bg-gray-800"
              }`}
          >

            Events

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

                Faculty Dashboard

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
                  "Faculty"
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

        {/* =========================================
        HOME MODULE
        ========================================= */}

        {
          activeModule === "HOME" && (
            <HomeSection
              stats={{
                classes,
                sentMessages,
              }}
            />
          )
        }

        {/* =========================================
                CLASSES MODULE
                ========================================= */}
        {
          activeModule === "CLASSES" && (
            <GroupsSection
              groups={classes}
              selectedGroupStudents={selectedClassStudents}
              selectedGroupName={selectedClassName}
              onOpenGroup={(groupId, groupName) =>
                fetchClassStudents(groupId, groupName)
              }
            />
          )
        }
        {/* =========================================
                CATEGORY MODULE
                ========================================= */}

        {
          activeModule === "CATEGORY" && (
            <CategorySection
              groups={classes}
              selectedGroup={selectedClass}
              onGroupChange={(groupId) => {
                setSelectedClass(groupId);
                fetchCategories(groupId);
              }}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              messageCategories={messageCategories}
              handleCreateCategory={handleCreateCategory}
            />
          )
        }

        {/* =========================================
                MESSAGE MODULE
                ========================================= */}

        {
          activeModule === "MESSAGE" && (

            <MessageSection

              groups={classes}
              categories={messageCategories}

              selectedGroup={selectedClass}
              setSelectedGroup={setSelectedClass}

              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}

              title={title}
              setTitle={setTitle}

              message={message}
              setMessage={setMessage}

              deadline={deadline}
              setDeadline={setDeadline}

              onGroupChange={(groupId) => {

                setSelectedClass(groupId);

                fetchCategories(groupId);

              }}

              handleSendMessage={handleSendMessage}

            />

          )
        }

        {/* =========================================
                ANALYTICS MODULE
                ========================================= */}

        {
          activeModule === "ANALYTICS" && (

            <AnalyticsSection

              analyticsSearch={analyticsSearch}
              setAnalyticsSearch={setAnalyticsSearch}

              analyticsClassFilter={analyticsClassFilter}
              setAnalyticsClassFilter={setAnalyticsClassFilter}

              analyticsCategoryFilter={analyticsCategoryFilter}
              setAnalyticsCategoryFilter={setAnalyticsCategoryFilter}

              analyticsStatusFilter={analyticsStatusFilter}
              setAnalyticsStatusFilter={setAnalyticsStatusFilter}

              analyticsSort={analyticsSort}
              setAnalyticsSort={setAnalyticsSort}

              classes={classes}

              analyticsCategories={analyticsCategories}

              filteredAnalyticsMessages={filteredAnalyticsMessages}

              analytics={analytics}

              expandedAnalyticsId={expandedAnalyticsId}
              setExpandedAnalyticsId={setExpandedAnalyticsId}

              selectedAnalyticsView={selectedAnalyticsView}
              setSelectedAnalyticsView={setSelectedAnalyticsView}

              allStudentAnalytics={allStudentAnalytics}

            />

          )
        }

        {/* =========================================
                TASKS MODULE
                ========================================= */}

        {/* TASKS */}

        {/* TASK MANAGEMENT */}

        {
          activeModule === "TASKS" && (

            <TasksSection

              setShowTaskModal={setShowTaskModal}

              loadingTasks={loadingTasks}

              tasks={tasks}

              taskSearch={taskSearch}
              setTaskSearch={setTaskSearch}

              taskClassFilter={taskClassFilter}
              setTaskClassFilter={setTaskClassFilter}

              taskStudentFilter={taskStudentFilter}
              setTaskStudentFilter={setTaskStudentFilter}

              taskStatusFilter={taskStatusFilter}
              setTaskStatusFilter={setTaskStatusFilter}

              taskPriorityFilter={taskPriorityFilter}
              setTaskPriorityFilter={setTaskPriorityFilter}

              taskSortOption={taskSortOption}
              setTaskSortOption={setTaskSortOption}

              classNames={classNames}
              studentNames={studentNames}

              filteredTasks={filteredTasks}

              expandedTaskId={expandedTaskId}
              setExpandedTaskId={setExpandedTaskId}

              fetchTaskTimeline={fetchTaskTimeline}

              timelineUpdates={timelineUpdates}

            />

          )
        }

        {/* =========================================
        Class Dashboard
        ========================================= */}

        {
          activeModule === "CLASS_DASHBOARD" && (

            <ClassDashboardSection

              dashboardSummary={dashboardSummary}

              dashboardClassFilter={dashboardClassFilter}
              setDashboardClassFilter={setDashboardClassFilter}

              dashboardStudentFilter={dashboardStudentFilter}
              setDashboardStudentFilter={setDashboardStudentFilter}

              dashboardCompletedFilter={dashboardCompletedFilter}
              setDashboardCompletedFilter={setDashboardCompletedFilter}

              dashboardPendingFilter={dashboardPendingFilter}
              setDashboardPendingFilter={setDashboardPendingFilter}

              classes={classes}

              filteredDashboardData={filteredDashboardData}

              viewPendingTasks={viewPendingTasks}

            />

          )
        }



        {/* =========================================
        EVENTS MODULE
        ========================================= */}

        {
          activeModule === "EVENTS" && (
            <EventsSection />
          )
        }

        {/* TASK MODAL */}

{
  showTaskModal && (

    <TaskModal

      setShowTaskModal={setShowTaskModal}

      selectedTaskClass={selectedTaskClass}
      setSelectedTaskClass={setSelectedTaskClass}

      fetchTaskStudents={fetchTaskStudents}

      classes={classes}

      selectedStudent={selectedStudent}
      setSelectedStudent={setSelectedStudent}

      classStudents={classStudents}

      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}

      taskDescription={taskDescription}
      setTaskDescription={setTaskDescription}

      taskPriority={taskPriority}
      setTaskPriority={setTaskPriority}

      taskDeadline={taskDeadline}
      setTaskDeadline={setTaskDeadline}

      handleCreateTask={handleCreateTask}

    />

  )
}
        {/* =========================================
        PENDING TASKS MODAL
        ========================================= */}

{
  showPendingTasksModal && (

    <PendingTasksModal

      selectedStudentName={selectedStudentName}

      setShowPendingTasksModal={setShowPendingTasksModal}

      selectedStudentPendingTasks={selectedStudentPendingTasks}

    />

  )
}



        {/* PROFILE MODAL */}

    {
      showProfileModal && (

        <ProfileModal

          profile={profile}

          fullName={fullName}
          setFullName={setFullName}

          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}

          address={address}
          setAddress={setAddress}

          setShowProfileModal={setShowProfileModal}

          handleUpdateProfile={handleUpdateProfile}

        />

      )
    }

      </div>
      
    </div>
    );
  }