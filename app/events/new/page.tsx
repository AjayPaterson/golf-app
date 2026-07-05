"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";


type Course = {
    id: string
    name: string
    location: string
}

const initialFormData = {
    name: '',
    start_date: '',
    play_format: '',
    course_id: '',
    players: [] as string[]
}

function StepOne({ formData, setFormData }: {
    formData: typeof initialFormData,
    setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>
    }) {
 return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                    placeholder={`Casual Round - ${new Date().toLocaleDateString()}`}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value})}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="play_format">Game Format</Label>
                <select
                    value={formData.play_format}
                    onChange={(e) => setFormData({ ...formData, play_format: e.target.value })}
                >
                    <option value="">Select a format</option>
                    <option value="stroke_play">Stroke Play</option>
                    <option value="match_play">Match Play</option>
                    <option value="best_ball">Best Ball</option>
                    <option value="scramble">Scramble</option>
                    <option value="stableford">Stableford</option>
                </select>
            </div>
        </div>
    )
}



function StepTwo({ formData, setFormData }: {
    formData: typeof initialFormData,
    setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>
    }) {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch ('/api/courses')
            const data = await response.json()
            setCourses(data)
        }
        fetchCourses()
    }, [])
    
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <select
                    value={formData.course_id}
                    onChange={(e) => setFormData({ ...formData, course_id: e.target.value})}
                >
                    <option value="">Select A Course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name} - {course.location}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
   


export default function NewEventPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(initialFormData)

    function renderStep() {
        if(step === 1) return <StepOne formData={formData} setFormData={setFormData} />
        if(step === 2) return <StepTwo formData={formData} setFormData={setFormData}/>
        if(step === 3) return <div>Step 3 - Players</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {renderStep()}
                    <div className="flex justify-between">
                        {step > 1 && (
                            <Button onClick={() => setStep(step - 1)}>Back</Button>
                        )}
                        {step < 3 && (
                            <Button onClick={() => setStep(step + 1)}>Next</Button>
                        )}
                        {step === 3 && (
                            <Button onClick={handleSubmit}>Create Event</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            
        </div>
    )
}