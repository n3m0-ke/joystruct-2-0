import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

interface ProjectCardProps {
    imageUrl: string;
    name: string;
    description: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, name, description }) => {
    return (
        <Card className="w-full max-w-[48rem] flex-row bg-opacity-15 text-white hover:bg-opacity-25 hover:border-goldenrod" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
            >
                <img
                    src={imageUrl}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Typography variant="h6" color="gray" className="mb-4 uppercase text-purple-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {name}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    By Admin
                </Typography>
                <Typography color="gray" className="mb-8 font-normal text-zinc-300" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {description}
                </Typography>
                <a href="#" className="inline-block">
                    <Button variant="text" className="flex items-start gap-2 text-goldenrod" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Edit
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </a>
            </CardBody>
        </Card>
    );
}