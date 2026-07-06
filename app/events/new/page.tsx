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

type Player = {
    id: string
    first_name: string
    last_name: string
    handicap_index: number | null
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

    const today = new Date()
    const [placeholderName] = useState(`Casual Round - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`)

 return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                    placeholder= {placeholderName}
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


function StepThree({ formData, setFormData }: {
    formData: typeof initialFormData,
    setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>
    }) {

    const [ search, setSearch ] = useState('')
    const [ results, setResults ] = useState<Player[]>([])
    const [ selectedPlayers, setSelectedPlayers ] = useState<Player[]>([])

    useEffect(() => {
        async function searchPlayers() {
            const response = await fetch (`/api/players?search=${search}`)
            const data = await response.json()
            console.log('Search results:', data)
            setResults(data)
        }
        searchPlayers()
    }, [search])

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            players: selectedPlayers.map(p => p.id)
        }))
    }, [selectedPlayers])

    function addPlayer(player: Player) {
        if (!selectedPlayers.find(p=> p.id === player.id)) {
            setSelectedPlayers([...selectedPlayers, player])
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="search">Search Players</Label>
                <Input 
                    id="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>

                {/* Search Results */}
                {results.length > 0 && (
                    <div className="space-y-1">
                        {results.map((player) => (
                            <div
                                key={player.id}
                                onClick={() => addPlayer(player)}
                                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                            >
                                {player.first_name} {player.last_name}
                                {player.handicap_index && ` (HCP: ${player.handicap_index})`}
                            </div>
                        ))}
                    </div>
                )}

                {/* Selected Players */}
                {selectedPlayers.length > 0 && (
                    <div className="space-y-2">
                        <Label>Added Players</Label>
                        {selectedPlayers.map((player) => (
                            <div key={player.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span>{player.first_name} {player.last_name}</span>
                                <button 
                                    onClick={() => setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id))}
                                    className="text-red-500 text-sm"
                                >
                                Remove
                                </button>
                            </div>    
                        ))}
                    </div>
                )}  
            </div>
    )
}
   

export default function NewEventPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit() {
        const submittedData = {
            ...formData,
            name: formData.name || `Casual Round - ${new Date().toLocaleDateString()}`
        }
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: submittedData.name,
                start_date: formData.start_date,
                play_format: formData.play_format,
                course_id: formData.course_id,
                player_ids: formData.players,
            })
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error || "Something went wrong")
            return
        }

        router.push('/')
    } catch (err) {
        setError("Soemthing went wrong, please try again")
    } finally {
        setLoading(false)
    }

}

    function renderStep() {
        if(step === 1) return <StepOne formData={formData} setFormData={setFormData} />
        if(step === 2) return <StepTwo formData={formData} setFormData={setFormData}/>
        if(step === 3) return <StepThree formData={formData} setFormData={setFormData}/>
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
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