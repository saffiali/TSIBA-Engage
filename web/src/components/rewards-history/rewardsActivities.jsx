import React from 'react'
import API from '../../api';
import PointsSent from './points-sent.jsx'
import PointsReceived from './points-received.jsx'
import PointsApproved from './points-approved.jsx'
import TableFilter from './table-filter';

require('../../styles/history.css')

/*
Notes to Maddie:
- we will have to change state or something with the buttons (make prettier later) to filter which table shows
- we need to determine best way to get the actual employee name rather than the ID in the reward table. I don't know solution yet.
- I did not start the approvals table
*/

class RewardsActivities extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rewards: [],
            employees: [],
        }
    }
    
    componentDidMount(){
        if(!this.props.isAuthenticated){
            alert('Login In');
            this.props.history.push("/login");
        } else {
            API.get('rewards').then(res => {
                const rewards = res.data;
                this.setState({ rewards: rewards });
            })
        }
    }

    render() {
        const employeeId = this.props.employeeId
        const rewardsList = this.state.rewards

        let employeeToFilter = this.props.employeeId;
          
          // filter rewards sent     list based on who is logged in/state
          const rewardsSentList  = this.state.rewards.filter(function(employee) {
            return employee.from_employee_id == employeeToFilter
          })
          // filter rewards received list based on who is logged in/state
          const rewardsReceivedList  = this.state.rewards.filter(function(employee) {
            return employee.to_employee_id == employeeToFilter
          })
          
        function isManager(employee) {
            this.state.rewards.filter(function(employee) {
                return employee.to_employee_id == employeeToFilter

            })
        }

        console.log('^^^^^^^', this.props)

        const rewardsSent = rewardsSentList.map(reward => (
            <PointsSent 
                key= {reward.id} 
                id= {reward.id} 
                receiver= {reward.to_employee_id} 
                points= {reward.level_id} 
                status= {reward.status} 
                rewardMsg= {reward.reward_message}
                date= {reward.created_at}
            />
        ))

        const rewardsRecevied = rewardsReceivedList.map(reward => (
            <PointsReceived 
                key= {reward.id} 
                id= {reward.id} 
                receiver= {reward.from_employee_id} 
                points= {reward.level_id} 
                rewardMsg= {reward.reward_message}
                date= {reward.created_at}
            />
        ))

        return (
            <div className="Rewards_Activities">
                <h1>Rewards Activities</h1>
                
                <TableFilter/>    
                
                Points Sent to:
                <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Receiver</th>
                        <th>Points</th>
                        <th>Status</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                 {rewardsSent}
                </table>

                Points Received
                <table className="table table-striped table-hover">
                <thead>
                    
                    <tr>
                        <th>Received From</th>
                        <th>Points</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                 {rewardsRecevied}
                </table>
            </div>
        )
    }
}
export default RewardsActivities