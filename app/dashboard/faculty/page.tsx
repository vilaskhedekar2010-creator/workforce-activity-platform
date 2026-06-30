"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase-client";
import { checkUserStatus } from "@/lib/checkUserStatus";
import HomeSection from "@/dashboard/faculty/components/HomeSection";
import GroupsSection from "@/dashboard/faculty/components/GroupsSection";
import CategorySection from "@/dashboard/faculty/components/CategorySection";
import MessageSection from "@/dashboard/faculty/components/MessageSection";

const formatDateTime = (
  value: string | null
) => {

  if (!value) {

    return "--";
  }

  return new Date(value)
    .toLocaleString(
      "en-IN",
      {
        timeZone:
          "Asia/Kolkata",

        day: "2-digit",
        month: "2-digit",
        year: "numeric",

        hour: "2-digit",
        minute: "2-digit",

        hour12: true
      }
    );
};

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
        (cls:any) =>
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

      const memberMap:any = {};

        members?.forEach((m:any) => {

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
            (m:any) =>
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
            student:any
          ) => {

            const studentTasks =

              allTasks?.filter(
                (
                  task:any
                ) =>

                  task.assigned_to ===
                  student.id
              ) || [];

            const completedTasks =

              studentTasks.filter(
                (
                  task:any
                ) =>

                  task.status ===
                  "COMPLETED"
              ).length;

            const pendingTasks =

              studentTasks.filter(
                (
                  task:any
                ) =>

                  task.status !==
                  "COMPLETED"
              ).length;

            const totalProgress =

              studentTasks.reduce(
                (
                  sum:number,
                  task:any
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
            (row:any) =>

              row.total_tasks > 0
          ).length,

        freeStudents:

          dashboardRows.filter(
            (row:any) =>

              row.total_tasks === 0
          ).length,

        totalTasks:

          dashboardRows.reduce(
            (
              sum:number,
              row:any
            ) =>

              sum +
              row.total_tasks,

            0
          ),

        completedTasks:

          dashboardRows.reduce(
            (
              sum:number,
              row:any
            ) =>

              sum +
              row.completed_tasks,

            0
          ),

        pendingTasks:

          dashboardRows.reduce(
            (
              sum:number,
              row:any
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
  studentId:string,
  studentName:string
) => {

  const pendingTasks =

    tasks.filter(
      (task:any) =>

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
          (m:any) =>
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
  ) => 
    {

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

  const memberMap:any = {};

    members?.forEach((m:any) => {

      memberMap[m.student_id] =
        m.class_id;

    });

  if (memberError) {

    console.log(memberError);

    return;
  }

  const studentIds =
    members?.map(
      (m:any) => m.student_id
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
            className={`rounded px-4 py-3 text-left transition ${
              activeModule ===
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
          activeModule ===
          "ANALYTICS" && (

          <div className="min-h-[60vh]">

            <div className="rounded-2xl bg-white p-10 shadow-xl">

              {/* HEADER */}

              <h1 className="text-5xl font-bold text-blue-700">

                Message Analytics

              </h1>

              <p className="mt-6 text-2xl text-gray-600">

                Advanced analytics dashboard

              </p>

              {/* TOP INFO CARDS */}



              {/* FILTERS */}

              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5">

                {/* SEARCH */}

                <input
                  type="text"
                  placeholder="Search messages..."
                  value={analyticsSearch}
                  onChange={(e) =>
                    setAnalyticsSearch(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4 outline-none focus:border-blue-500"
                />

                {/* CLASS */}

                <select
                  value={analyticsClassFilter}
                  onChange={(e) =>
                    setAnalyticsClassFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="ALL">

                    All Classes

                  </option>

                  {
                    classes.map(
                      (cls) => (

                      <option
                        key={cls.id}
                        value={cls.id}
                      >

                        {cls.name}
                        {" "}
                        {cls.section}

                      </option>

                    ))
                  }

                </select>

                {/* CATEGORY */}

                <select
                  value={analyticsCategoryFilter}
                  onChange={(e) =>
                    setAnalyticsCategoryFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="ALL">

                    All Categories

                  </option>

                  {
                    analyticsCategories.map(
                      (cat) => (

                      <option
                        key={cat.id}
                        value={cat.id}
                      >

                        {cat.name}

                      </option>

                    ))
                  }

                </select>

                {/* STATUS */}

                <select
                  value={analyticsStatusFilter}
                  onChange={(e) =>
                    setAnalyticsStatusFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="ALL">

                    All Status

                  </option>

                  <option value="PENDING">

                    Pending

                  </option>

                  <option value="COMPLETED">

                    Completed

                  </option>

                </select>

                {/* SORT */}

                <select
                  value={analyticsSort}
                  onChange={(e) =>
                    setAnalyticsSort(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="LATEST">

                    Latest First

                  </option>

                  <option value="OLDEST">

                    Oldest First

                  </option>

                </select>

              </div>

              {/* ANALYTICS MESSAGE LIST */}

              <div className="mt-10 space-y-8">

                {
                  filteredAnalyticsMessages.length === 0 ? (

                    <div className="rounded-2xl bg-gray-50 p-12 text-center">

                      <h2 className="text-3xl font-bold text-gray-700">

                        No Analytics Found

                      </h2>

                      <p className="mt-3 text-gray-500">

                        No messages match current filters

                      </p>

                    </div>

                  ) : (

                    filteredAnalyticsMessages.map(
                      (msg: any) => {

                        const stats =
                          analytics[msg.id];

                        return (

                          <div
                            key={msg.id}
                            className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:shadow-xl"
                          >

                            {/* HEADER */}

                            <div className="p-8">

                              {/* TOP */}

                              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                                {/* LEFT */}

                                <div>

                                  <h2 className="text-3xl font-bold text-blue-700">

                                    {msg.title}

                                  </h2>
                      


<div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">

  {/* CLASS */}

  <div>

    <p className="text-sm font-semibold text-gray-500">

      Class / Group

    </p>

    <p className="mt-1 text-lg font-semibold text-gray-800">

      {
        classes.find(
          (cls) =>
            cls.id ===
            msg.class_id
        )?.name
      }

    </p>

  </div>

  {/* CATEGORY */}

  <div>

    <p className="text-sm font-semibold text-gray-500">

      Category

    </p>

    <p className="mt-1 text-lg font-semibold text-gray-800">

    {
      analyticsCategories.find(
        (cat) =>
          cat.id === msg.category_id
      )?.name
    }

    </p>

  </div>

  {/* POSTED */}

  <div>

    <p className="text-sm font-semibold text-gray-500">

      Posted

    </p>

    <p className="mt-1 text-lg font-semibold text-gray-800">

      {
        formatDateTime(
          msg.created_at
        )
      }

    </p>

  </div>

  {/* DEADLINE */}

  <div>

    <p className="text-sm font-semibold text-gray-500">

      Deadline

    </p>

    <p className="mt-1 text-lg font-semibold text-gray-800">

        {
          msg.acknowledgement_deadline

            ?

            formatDateTime(
              msg.acknowledgement_deadline
            )

            :

            "No Deadline"
        }

    </p>

  </div>

</div>

                                </div>

                                {/* STATUS */}

                                <div>

                                  {
                                    stats?.pending === 0 ? (

                                      <div className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">

                                        Completed

                                      </div>

                                    ) : (

                                      <div className="rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-700">

                                        Pending

                                      </div>

                                    )
                                  }

                                </div>

                              </div>
                              
                                      {/* =========================================
                                          Condition - After Click on Analytics Card, Show/Hide Details
                                          ========================================= */}
                              
                                {
                                  expandedAnalyticsId ===
                                  msg.id && (

                                    <>

                                      {/* ANALYTICS SUMMARY */}

                                      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">

                                        <div className="rounded-2xl bg-blue-50 p-6 text-center">

                                          <h2 className="text-5xl font-bold text-blue-700">

                                            {
                                              stats?.total || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Total

                                          </p>

                                        </div>

                                        <div
                                          onClick={() =>
                                            setSelectedAnalyticsView(
                                              (prev:any) => ({
                                                ...prev,
                                                [msg.id]:
                                                  "ACKNOWLEDGED"
                                              })
                                            )
                                          }
                                          className="cursor-pointer rounded-2xl bg-green-50 p-6 text-center transition hover:scale-105"
                                        >
 
                                          <h2 className="text-5xl font-bold text-green-700">

                                            {
                                              stats?.acknowledged || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Acknowledged

                                          </p>

                                        </div>

                                        <div
                                            onClick={() =>
                                              setSelectedAnalyticsView(
                                                (prev:any) => ({
                                                  ...prev,
                                                  [msg.id]:
                                                    "PENDING"
                                                })
                                              )
                                            }
                                            className="cursor-pointer rounded-2xl bg-red-50 p-6 text-center transition hover:scale-105"
                                          >
                                          <h2 className="text-5xl font-bold text-red-700">

                                            {
                                              stats?.pending || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Pending

                                          </p>

                                        </div>

                                        <div
                                            onClick={() =>
                                              setSelectedAnalyticsView(
                                                (prev:any) => ({
                                                  ...prev,
                                                  [msg.id]:
                                                    "LATE"
                                                })
                                              )
                                            }
                                            className="cursor-pointer rounded-2xl bg-yellow-50 p-6 text-center transition hover:scale-105"
                                          >

                                          <h2 className="text-5xl font-bold text-yellow-700">

                                            {
                                              stats?.late || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Late

                                          </p>

                                        </div>

                                      </div>

                                    </>
                                  )
                                }
                                {/* STUDENT ANALYTICS TABLE */}

                                {
                                  expandedAnalyticsId ===
                                  msg.id

                                  &&

                                  selectedAnalyticsView[
                                    msg.id
                                  ] && (

                                    <div className="mt-10 overflow-x-auto rounded-2xl border">

                                      <div className="border-b bg-gray-50 p-5">

                                        <h2 className="text-2xl font-bold text-gray-800">

                                          {
                                            selectedAnalyticsView[
                                              msg.id
                                            ]
                                          }

                                          {" "}

                                          Students

                                        </h2>

                                      </div>

                                      <table className="min-w-full">

                                        <thead className="bg-gray-100">

                                          <tr>

                                            <th className="border p-4 text-left">

                                              Enrollment No

                                            </th>

                                            <th className="border p-4 text-left">

                                              Student Name

                                            </th>

                                            <th className="border p-4 text-left">

                                              Email

                                            </th>

                                            <th className="border p-4 text-left">

                                              Mobile

                                            </th>

                                            <th className="border p-4 text-left">

                                              Status

                                            </th>

                                          </tr>

                                        </thead>

                                        <tbody>

                                          {
                                            (
                                              allStudentAnalytics[
                                                msg.id
                                              ] || []
                                            )

                                            .filter(
                                              (student:any) => {

                                                const selectedType =
                                                  selectedAnalyticsView[
                                                    msg.id
                                                  ];

                                                if (
                                                  selectedType ===
                                                  "ACKNOWLEDGED"
                                                ) {

                                                  return (
                                                    student.acknowledgement
                                                    === "Yes"
                                                  );
                                                }

                                                if (
                                                  selectedType ===
                                                  "PENDING"
                                                ) {

                                                  return (
                                                    student.acknowledgement
                                                    === "Pending"
                                                  );
                                                }

                                                if (
                                                  selectedType ===
                                                  "LATE"
                                                ) {

                                                  return (
                                                    student.acknowledgement
                                                    === "Late"
                                                  );
                                                }

                                                return true;
                                              }
                                            )

                                            .map(
                                              (
                                                student:any,
                                                index:number
                                              ) => (

                                                <tr
                                                  key={index}
                                                  className="hover:bg-gray-50"
                                                >

                                                  <td className="border p-4">

                                                    {
                                                      student.enrollment_number
                                                      || "--"
                                                    }

                                                  </td>

                                                  <td className="border p-4 font-semibold">

                                                          <pre className="text-xs">

                                                            {
                                                            student.name
                                                            || "--"
                                                          }

                                                          </pre>

                                                  </td>

                                                  <td className="border p-4">

                                                    {
                                                      student.email
                                                      || "--"
                                                    }

                                                  </td>

                                                  <td className="border p-4">

                                                    {
                                                      student.mobile
                                                      || "--"
                                                    }

                                                  </td>

                                                  <td className="border p-4">

                                                    {
                                                      student.acknowledgement
                                                      === "Yes"

                                                        ?

                                                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                                          Acknowledged

                                                        </span>

                                                        :

                                                        student.acknowledgement
                                                        === "Late"

                                                        ?

                                                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                                                          Late

                                                        </span>

                                                        :

                                                        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                                          Pending

                                                        </span>
                                                    }

                                                  </td>

                                                </tr>

                                              ))
                                          }

                                        </tbody>

                                      </table>

                                    </div>
                                )}
                                  {/* TOGGLE */}

                                  <div className="mt-8 text-right">

                                    <button
                                      onClick={() =>

                                        setExpandedAnalyticsId(

                                          expandedAnalyticsId ===
                                          msg.id

                                            ? ""

                                            : msg.id
                                        )
                                      }
                                      className="font-semibold text-blue-600"
                                    >

                                      {
                                        expandedAnalyticsId ===
                                        msg.id

                                          ?

                                          "Hide Details ▲"

                                          :

                                          "View Details ▼"
                                      }

                                    </button>

                                  </div>

                            </div>

                          </div>
                        );
                      })
                  )
                }

              </div>

            </div>

          </div>
        )}

        {/* =========================================
        TASKS MODULE
        ========================================= */}

        {/* TASKS */}

        {/* TASK MANAGEMENT */}

        {
          activeModule ===
          "TASKS" && (

          <div className="rounded-2xl bg-white p-8 shadow-lg">

            {/* HEADER */}

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h1 className="text-4xl font-bold text-gray-800">

                  Task Management

                </h1>

                <p className="mt-2 text-gray-500">

                  Assign and monitor student tasks

                </p>

              </div>

              <button
                onClick={() =>
                  setShowTaskModal(
                    true
                  )
                }
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >

                + Create Task

              </button>

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

                    No Tasks Created

                  </h2>

                  <p className="mt-2 text-gray-500">

                    Create your first task

                  </p>

                </div>

              </div>
            )}
<div className="mb-6 rounded-2xl border bg-gray-50 p-5">

  <div className="grid grid-cols-1 gap-4 md:grid-cols-6">

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
      value={taskClassFilter}
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
          classNames
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

    {/* STUDENT */}

    <select
      value={taskStudentFilter}
      onChange={(e) =>
        setTaskStudentFilter(
          e.target.value
        )
      }
      className="rounded-xl border p-3"
    >

      <option value="ALL">

        All Students

      </option>

      {
        Object.values(
          studentNames
        ).map(
          (student: any) => (

            <option
              key={student.id}
              value={student.id}
            >

              {student.full_name}

            </option>
          )
        )
      }

    </select>

    {/* STATUS */}

    <select
      value={taskStatusFilter}
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
      value={taskPriorityFilter}
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

    {/* SORT */}

    <select
      value={taskSortOption}
      onChange={(e) =>
        setTaskSortOption(
          e.target.value
        )
      }
      className="rounded-xl border p-3"
    >

      <option value="LATEST">
        Latest First
      </option>

      <option value="OLDEST">
        Oldest First
      </option>

    </select>

  </div>

</div>
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

                      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

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
                              formatDateTime(
                                task.created_at
                              )
                            }

                          </p>

                        </div>

                        <div className="flex items-center gap-2">

                          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">

                            {task.current_progress || 0}%

                          </span>

                          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800">

                            {task.status}

                          </span>

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="grid gap-5 md:grid-cols-4">

                        {/* STUDENT */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Assigned Student

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                                studentNames[
                                  task.assigned_to
                                ]?.full_name
                                || task.assigned_to
                            }

                          </p>

                          <p className="text-sm text-gray-500">

                            {
                              task.profiles
                              ?.enrollment_number
                            }

                          </p>

                          <div className="text-sm text-gray-500">

                          {
                            studentNames[
                              task.assigned_to
                            ]?.enrollment_number
                            || "--"
                          }

                        </div>

                        </div>

                        {/* CLASS */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Class

                          </p>

                            <p className="mt-1 text-lg font-bold text-gray-800">

                              {
                                classNames[
                                  task.class_id
                                ]

                                  ?

                                  `${classNames[task.class_id].name} - Section ${classNames[task.class_id].section}`

                                  :

                                  "--"
                              }

                            </p>

                        </div>

                        {/* PRIORITY */}

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

                        {/* DEADLINE */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Deadline

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                              formatDateTime(
                                task.deadline
                              )
                            }

                          </p>

                        </div>

                      </div>

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

                      {/* VIEW DETAILS */}

                      <div className="mt-6">

                        <button
                          onClick={async () => {

                            if (
                              expandedTaskId ===
                              task.id
                            ) {

                              setExpandedTaskId(
                                ""
                              );

                            } else {

                              setExpandedTaskId(
                                task.id
                              );

                              await fetchTaskTimeline(
                                task.id
                              );
                            }
                          }}
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >

                          {
                            expandedTaskId ===
                            task.id

                              ?

                              "Hide Timeline ▲"

                              :

                              "View Timeline ▼"
                          }

                        </button>

                      </div>
                                            {
                        expandedTaskId ===
                        task.id && (

                          <div className="mt-4 rounded-xl bg-gray-50 p-4">

                            <h4 className="mb-4 text-lg font-bold text-gray-700">

                              Progress Timeline

                            </h4>

                            {
                              timelineUpdates.length === 0 && (

                                <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-gray-500">

                                  No progress updates yet

                                </div>
                              )
                            }

                            {
                              timelineUpdates.map(
                                (
                                  update
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
                                            formatDateTime(
                                              update.created_at
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
                        )
                      }

                    </div>
                  )
                )
              }

            </div>

          </div>
        )}

        {/* =========================================
        Class Dashboard
        ========================================= */}

        {
            activeModule ===
            "CLASS_DASHBOARD" && (

            <div className="rounded-2xl bg-white p-8 shadow-lg">

              <h1 className="mb-8 text-4xl font-bold text-gray-800">

                Class Dashboard

              </h1>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">

                <div className="rounded-xl bg-blue-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Total Students

                  </h3>

                  <p className="text-3xl font-bold text-blue-700">

                    {
                      dashboardSummary
                      .totalStudents
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Active Students

                  </h3>

                  <p className="text-3xl font-bold text-green-700">

                    {
                      dashboardSummary
                      .activeStudents
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-yellow-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Free Students

                  </h3>

                  <p className="text-3xl font-bold text-yellow-700">

                    {
                      dashboardSummary
                      .freeStudents
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-purple-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Total Tasks

                  </h3>

                  <p className="text-3xl font-bold text-purple-700">

                    {
                      dashboardSummary
                      .totalTasks
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Completed

                  </h3>

                  <p className="text-3xl font-bold text-green-700">

                    {
                      dashboardSummary
                      .completedTasks
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-red-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Pending

                  </h3>

                  <p className="text-3xl font-bold text-red-700">

                    {
                      dashboardSummary
                      .pendingTasks
                    }

                  </p>

                </div>

              </div>

              <div className="mt-8 mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">

  {/* CLASS */}

  <select
    value={dashboardClassFilter}
    onChange={(e) =>
      setDashboardClassFilter(
        e.target.value
      )
    }
    className="rounded-xl border p-3"
  >

    <option value="ALL">
      All Classes
    </option>

    {
      classes.map(
        (cls:any) => (

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

  {/* STUDENT */}

  <input
    type="text"
    placeholder="Search Student..."
    value={dashboardStudentFilter}
    onChange={(e) =>
      setDashboardStudentFilter(
        e.target.value
      )
    }
    className="rounded-xl border p-3"
  />

  {/* COMPLETED */}

  <select
    value={dashboardCompletedFilter}
    onChange={(e) =>
      setDashboardCompletedFilter(
        e.target.value
      )
    }
    className="rounded-xl border p-3"
  >

    <option value="ALL">
      All Completed
    </option>

    <option value="YES">
      Has Completed Tasks
    </option>

    <option value="NO">
      No Completed Tasks
    </option>

  </select>

  {/* PENDING */}

  <select
    value={dashboardPendingFilter}
    onChange={(e) =>
      setDashboardPendingFilter(
        e.target.value
      )
    }
    className="rounded-xl border p-3"
  >

    <option value="ALL">
      All Pending
    </option>

    <option value="YES">
      Has Pending Tasks
    </option>

    <option value="NO">
      No Pending Tasks
    </option>

  </select>

</div>
              
              {/* ========Class Dashboard table Header ======== */}
              
              <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">

                <table className="min-w-full">

                  <thead className="bg-gray-100">

                    <tr>

                      <th className="border-b px-4 py-3 text-center font-bold w-16">
                        Sr No
                      </th>

                      <th className="border-b px-4 py-3 text-left font-bold w-48">
                        Enrollment No
                      </th>

                      <th className="border-b px-4 py-3 text-left font-bold min-w-[250px]">
                        Student Name
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-28">
                        Total Tasks
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-28">
                        Completed
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-28">
                        Pending
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-56">
                        Progress
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      
                      filteredDashboardData.map(
                        (
                          row:any,
                          index:number
                        ) => (

                          <tr
                            key={row.student_id}
                            className="hover:bg-blue-50 transition"
                          >
                            {/* SR NO */}

                            <td className="border-b px-4 py-3 text-center">

                              {index + 1}

                            </td>

                            {/* ENROLLMENT */}

                            <td className="border-b px-4 py-3 font-medium">

                              {row.enrollment_number || "--"}

                            </td>

                            {/* NAME */}

                            <td className="border-b px-4 py-3 font-medium">

                              {row.student_name}

                            </td>

                            {/* TOTAL TASKS */}

                            <td className="border-b px-4 py-3 text-center font-semibold">

                              {row.total_tasks}

                            </td>

                            {/* COMPLETED */}

                            <td className="border-b px-4 py-3 text-center">

                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">

                                {row.completed_tasks}

                              </span>

                            </td>

                            {/* PENDING */}

                            <td className="border-b px-4 py-3 text-center">

                                <button
                                  onClick={() =>
                                    viewPendingTasks(
                                      row.student_id,
                                      row.student_name
                                    )
                                  }
                                  className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700 hover:bg-red-200"
                                >
                                  {row.pending_tasks}
                                </button>

                            </td>

                            {/* PROGRESS */}

                            <td className="border-b px-4 py-3">

                              <div className="flex items-center gap-3">

                                <div className="h-4 flex-1 rounded-full bg-gray-200 overflow-hidden">

                                  <div
                                    className={`h-4 rounded-full ${
                                      row.average_progress >= 80
                                        ? "bg-green-500"
                                        : row.average_progress >= 50
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${row.average_progress}%`,
                                    }}
                                  />

                                </div>

                                <span className="w-12 text-right font-semibold">

                                  {row.average_progress}%

                                </span>

                              </div>

                            </td>

                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            </div>

            

          )}

      

        {/* =========================================
        EVENTS MODULE
        ========================================= */}

        {
          activeModule ===
          "EVENTS" && (

          <div className="flex min-h-[60vh] items-center justify-center">

            <div className="rounded-2xl bg-white p-16 text-center shadow-xl">

              <h1 className="text-5xl font-bold text-blue-600">

                Coming Soon

              </h1>

              <p className="mt-4 text-xl text-gray-600">

                Event Management Module

              </p>

            </div>

          </div>
        )}

      </div>

      {/* TASK MODAL */}

      {
        showTaskModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">

                  Create Task

                </h2>

                <p className="mt-1 text-gray-500">

                  Assign task to student

                </p>

              </div>

              <button
                onClick={() =>
                  setShowTaskModal(
                    false
                  )
                }
                className="text-2xl font-bold text-gray-500 hover:text-gray-700"
              >

                ×

              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5">

              {/* CLASS */}

              <div>

                <label className="mb-2 block font-semibold text-gray-700">

                  Select Class

                </label>

                <select
                  value={
                    selectedTaskClass
                  }
                  onChange={(e) => {

                    setSelectedTaskClass(
                      e.target.value
                    );

                    fetchTaskStudents(
                      e.target.value
                    );
                  }}
                  className="w-full rounded-xl border p-3"
                >

                  <option value="">

                    Select Class

                  </option>

                  {
                    classes.map(
                      (
                        cls: any
                      ) => (

                        <option
                          key={cls.id}
                          value={cls.id}
                        >

                          {
                            cls.name
                          }{" "}

                          {
                            cls.section
                          }

                        </option>
                      )
                    )
                  }

                </select>

              </div>

              {/* STUDENT */}

              <div>

                <label className="mb-2 block font-semibold text-gray-700">

                  Select Student

                </label>

                <select
                  value={
                    selectedStudent
                  }
                  onChange={(e) =>
                    setSelectedStudent(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3"
                >

                  <option value="">

                    Select Student

                  </option>

                  {
                    classStudents.map(
                      (
                        student: any
                      ) => (

                        <option
                          key={student.id}
                          value={student.id}
                        >

                          {
                            student.full_name
                          }{" "}
                          (
                          {
                            student.enrollment_number
                          }
                          )

                        </option>
                      )
                    )
                  }

                </select>

              </div>

              {/* TITLE */}

              <div>

                <label className="mb-2 block font-semibold text-gray-700">

                  Task Title

                </label>

                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) =>
                    setTaskTitle(
                      e.target.value
                    )
                  }
                  placeholder="Enter task title"
                  className="w-full rounded-xl border p-3"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block font-semibold text-gray-700">

                  Description

                </label>

                <textarea
                  value={
                    taskDescription
                  }
                  onChange={(e) =>
                    setTaskDescription(
                      e.target.value
                    )
                  }
                  placeholder="Enter task description"
                  rows={5}
                  className="w-full rounded-xl border p-3"
                />

              </div>

              {/* PRIORITY */}

              <div>

                <label className="mb-2 block font-semibold text-gray-700">

                  Priority

                </label>

                <select
                  value={
                    taskPriority
                  }
                  onChange={(e) =>
                    setTaskPriority(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3"
                >

                  <option value="LOW">

                    LOW

                  </option>

                  <option value="MEDIUM">

                    MEDIUM

                  </option>

                  <option value="HIGH">

                    HIGH

                  </option>

                </select>

              </div>

              {/* DEADLINE */}

              <div>

                <label className="mb-2 block font-semibold text-gray-700">

                  Deadline

                </label>

                <input
                  type="datetime-local"
                  value={
                    taskDeadline
                  }
                  onChange={(e) =>
                    setTaskDeadline(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-4 pt-4">

                <button
                  onClick={() =>
                    setShowTaskModal(
                      false
                    )
                  }
                  className="rounded-xl bg-gray-300 px-5 py-3 font-semibold text-gray-800"
                >

                  Cancel

                </button>

                <button
                  onClick={
                    handleCreateTask
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >

                  Create Task

                </button>

              </div>

            </div>

          </div>

        </div>
      )}
        {/* =========================================
        PENDING TASKS MODAL
        ========================================= */}

        {
          showPendingTasksModal && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

              <div className="w-full max-w-5xl rounded-2xl bg-white p-8 shadow-2xl">

                {/* HEADER */}

                <div className="mb-6 flex items-center justify-between">

                  <div>

                    <h2 className="text-3xl font-bold text-blue-700">

                      Pending Tasks

                    </h2>

                    <p className="text-gray-500">

                      {selectedStudentName}

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setShowPendingTasksModal(false)
                    }
                    className="text-2xl font-bold text-gray-500 hover:text-red-600"
                  >

                    ✕

                  </button>

                </div>

                {/* TABLE */}

                <div className="overflow-x-auto">

                  <table className="min-w-full border">

                    <thead className="bg-gray-100">

                      <tr>

                        <th className="border p-3">
                          Task Title
                        </th>

                        <th className="border p-3">
                          Priority
                        </th>

                        <th className="border p-3">
                          Status
                        </th>

                        <th className="border p-3">
                          Progress
                        </th>

                        <th className="border p-3">
                          Deadline
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {
                        selectedStudentPendingTasks.length === 0 ? (

                          <tr>

                            <td
                              colSpan={5}
                              className="p-6 text-center text-gray-500"
                            >

                              No Pending Tasks

                            </td>

                          </tr>

                        ) : (

                          selectedStudentPendingTasks.map(
                            (task:any) => (

                              <tr key={task.id}>

                                <td className="border p-3">

                                  {task.title}

                                </td>

                                <td className="border p-3 text-center">

                                  {task.priority}

                                </td>

                                <td className="border p-3 text-center">

                                  {task.status}

                                </td>

                                <td className="border p-3 text-center">

                                  {task.current_progress || 0}%

                                </td>

                                <td className="border p-3 text-center">

                                  {
                                    formatDateTime(
                                      task.deadline
                                    )
                                  }

                                </td>

                              </tr>

                            )
                          )

                        )
                      }

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )
        }



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

                Faculty ID

              </label>

              <input
                type="text"
                value={profile?.employee_id || ""}
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