import React from 'react'

const HomePage = () => {
    return (
        <div style={{padding: '20px'}}>
            <div className='banner' >
                <img style={{width:"100%",maxHeight: '500px' ,borderRadius: '15px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', marginBottom: '20px', objectFit: 'cover'}} src="/assets/banner.jpg" alt='Banner'/>
            </div>
            <div className='services' style={{paddingTop: '20px'}}>
                <div className="cardy" style={{paddingBottom: '10px', display: 'flex', flexWrap: 'wrap'}}>
                    <div className="cardy-img">
                        <img src="/assets/schedule.jpg" style={{marginRight: '20px', maxWidth: '400px', objectFit: 'cover', borderRadius: '15px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', maxHeight: '300px'}} alt="Schedule" />
                    </div>
                    <div className="cardy-body" style={{padding: '20px', paddingTop: '20px', maxWidth: '700px'}}>
                        <span style={{fontWeight: 'bold', color: '#1A2142', fontSize: '20px', lineHeight: '3'}}>
                        Appointment Booking & Rescheduling
                        </span>
                        <br />
                        <span style={{fontWeight: 'bold', color: '#4A6572', fontSize: '20px', lineHeight: '1.5'}}>
                        Easily book or reschedule your appointments online at any time. If you need to make a change, just log in to adjust your appointment.
                        </span>
                    </div>
                </div>
                <div className="cardy" style={{paddingBottom: '10px', display: 'flex', flexWrap: 'wrap'}}>
                    <div className="cardy-img">
                        <img src="/assets/medical.png" style={{marginRight: '20px', objectFit: 'cover', maxWidth: '400px', borderRadius: '15px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', maxHeight: '300px'}} alt="Schedule" />
                    </div>
                    <div className="cardy-body" style={{padding: '20px', paddingTop: '20px', maxWidth: '700px'}}>
                        <span style={{fontWeight: 'bold', color: '#1A2142', fontSize: '20px', lineHeight: '3'}}>
                        Keep Track of Your Medical History
                        </span>
                        <br />
                        <span style={{fontWeight: 'bold', color: '#4A6572', fontSize: '20px', lineHeight: '1.5'}}>Stay on top of your health with easy online access to your medical history and prescriptions. Log in anytime to review past visits, treatments, and medications.</span>
                    </div>
                </div>
                <div className="cardy" style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div className="cardy-img">
                        <img src="/assets/chat.png" style={{marginRight: '20px', objectFit: 'cover', maxWidth: '400px', borderRadius: '15px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', maxHeight: '300px'}} alt="Schedule" />
                    </div>
                    <div className="cardy-body" style={{padding: '20px', paddingTop: '20px', maxWidth: '700px'}}>
                        <span style={{fontWeight: 'bold', color: '#1A2142', fontSize: '20px', lineHeight: '3'}}>
                        Chat With Your Doctors
                        </span>
                        <br />
                        <span style={{fontWeight: 'bold', color: '#4A6572', fontSize: '20px', lineHeight: '1.5'}}>You can message your doctor directly through our online system for quick consultations or to ask non-urgent questions.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
