import ActivitiesChart from "@/components/dashboard/ActivitiesChart";
import RecentUsers from "@/components/dashboard/RecentUsers";

const UserActivities = () => {
  return (
    <div>
      <ActivitiesChart />
      <div className="mt-16">
        <RecentUsers />
      </div>
    </div>
  );
};

export default UserActivities;
