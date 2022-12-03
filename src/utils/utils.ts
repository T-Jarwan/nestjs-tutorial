import { Course } from "src/interfaces/course";
import { Lesson } from "src/interfaces/lesson";

export function compareLessons(l1: Lesson, l2: Lesson) {

    const compareCourses = l1.courseId - l2.courseId;

    if (compareCourses > 0) {
        return 1;
    }
    else if (compareCourses < 0) {
        return -1;
    }
    else {
        return l1.seqNo - l2.seqNo;
    }

}

export function compareCourses(c1: Course, c2: Course) {

    const compare = c1.seqNo - c2.seqNo;

    if (compare > 0) {
        return 1;
    } else if (compare < 0) {
        return -1;
    } else {
        return 0;
    }

}