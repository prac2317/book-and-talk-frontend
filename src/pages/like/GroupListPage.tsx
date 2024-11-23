import React, {useEffect, useState} from "react";
import GroupItem from "../../components/GroupItem";
import ky from "ky";

interface GroupLike {
    id: number;
    name: string;
    participants: number;
    maxParticipants: number;
    startDate: string;
    duration: number;
    groupImage: string | null;
    location: string | null;

    bookTitle: string | null;
    createdAt: string | null;
}

interface GroupLikeList {
    data: GroupLike[];
}

// const generateGroup = (count: number) =>
//     Array.from({ length: count }, () => ({
//         id: faker.string.uuid(),
//         booktitle: faker.lorem.words(3),
//         title: faker.company.catchPhrase(),
//         location: faker.address.city(),
//         date: faker.date.future().toDateString().split("T")[0],
//         participants: faker.number.int({ min: 1, max: 10 }),
//         totalParticipants: faker.number.int({ min: 10, max: 20 }),
//         image: faker.image.urlLoremFlickr({
//             width: 80,
//             height: 80,
//             category: "group",
//         }),
//     })
//     );





const GroupListPage: React.FC = () => {
    const [groups, setGroups] = useState<GroupLikeList>();

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const data: GroupLikeList = await ky.get(`${import.meta.env.VITE_BASE_URL}/api/groups/like`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        },
                    }
                ).json();
                setGroups(data);
            } catch (error) {
                console.error('Failed to fetch group details:', error);
            }
        };

        fetchGroupData();
    }, []);
    return (
        <div>
            {groups?.data.map((group) => (
                <GroupItem key={group.id} {...group} />
            ))}
        </div>
    );
};

export default GroupListPage;
