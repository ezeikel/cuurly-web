import Users from '../components/Users';

const Home = props => (
  <div>
    <Users page={parseFloat(props.query.page) || 1}/>
  </div>
);

export default Home;
