import {useEffect, useState} from "react";
import _ from "lodash";
import {
  Button,
  Card,
  CardBody, CardSubtitle, CardText, CardTitle,
  Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
  Row, Table
} from "reactstrap";

import scheduleService from "../services/schedule.service";
import Layout from "../components/Layout";

const getDateValue = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

  return ''
}

function Schedule() {
  const [isEdit, setIsEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const toggle = () => setOpenForm(!openForm);
  const [schedule, setSchedule] = useState({});
  const [scheduleKeyword, setScheduleKeyword] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSearchSchedules = _.debounce((value) => {
    setScheduleKeyword(value)
  }, 1000)

  const handleClickSubmit = async () => {
    const result = await scheduleService[isEdit ? 'update' : 'create'](schedule);

    if (result.errors) {
      setErrors(result.errors);
    }

    if (result.status === 201) {
      setSchedules([
        result.data.data,
        ...schedules
      ]);
      setOpenForm(!openForm);
    }

    if (result.status === 200) {
      const updatedIndex = schedules.indexOf(schedules.find((s) => s._id === schedule._id))
      schedules[updatedIndex] = {
        ...result.data.data,
        creator: _.get(schedule, 'creator')
      }
      setSchedules(schedules);
      setOpenForm(!openForm);
      setIsEdit(false);
    }
  }

  const handleClickDelete = async (schedule) => {
    const result = await scheduleService.remove(schedule);

    if (result.errors) {
      setErrors(result.errors);
    }

    if (result.status === 200) {
      setSchedules([
        ...schedules.filter((s) => s._id !== schedule.id)
      ]);
    }

    setIsEdit(false)
  }

  useEffect(() => {
    if (_.isEmpty(schedules)) {
      scheduleService.fetchAll().then((result) => {
        setSchedules(result);
      });
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(scheduleKeyword)) {
      scheduleService.fetchAll(scheduleKeyword).then((result) => {
        setSchedules(result);
      });
    }
  }, [scheduleKeyword])

  return (
    <Layout searchPlaceholder={'Search schedules'} onSearchChange={(value) => handleSearchSchedules(value)}>
      <Row>
        <Col className="p-4">
          <Button color="info" onClick={toggle}>
            {'Add Schedule'}
          </Button>
          <Modal isOpen={openForm} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="creator">
                    {'Your Name'}
                  </Label>
                  <Input
                    id="creator"
                    name="creator"
                    placeholder="e.g: Some short description"
                    type="text"
                    disabled={isEdit === true}
                    value={_.get(schedule, 'creator.name') || _.get(schedule, 'creator')}
                    invalid={_.has(errors, 'creator')}
                    onChange={({ target: { name, value } }) => setSchedule({ ...schedule, [name]: value })}
                  />
                  <FormFeedback>
                    {_.get(errors, 'creator.0')}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="title">
                    {'Title'}
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="The schedule title"
                    value={_.get(schedule, 'title')}
                    invalid={_.has(errors, 'title')}
                    onChange={({ target: { name, value } }) => setSchedule({ ...schedule, [name]: value })}
                  />
                  <FormFeedback>
                    {_.get(errors, 'title.0')}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="description">
                    {'Description'}
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="e.g: Some short description"
                    type="textarea"
                    value={_.get(schedule, 'description')}
                    invalid={_.has(errors, 'description')}
                    onChange={({ target: { name, value } }) => setSchedule({ ...schedule, [name]: value })}
                  />
                  <FormFeedback>
                    {_.get(errors, 'description.0')}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="date">
                    {'Date'}
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    placeholder="e.g: Some short description"
                    type="date"
                    value={getDateValue(_.get(schedule, 'date'))}
                    invalid={_.has(errors, 'date')}
                    onChange={({ target: { name, value } }) => setSchedule({ ...schedule, [name]: value })}
                  />
                  <FormFeedback>
                    {_.get(errors, 'date.0')}
                  </FormFeedback>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleClickSubmit}>
                {'Submit'}
              </Button>{' '}
              <Button color="secondary" onClick={toggle} onClickCapture={() => setSchedule({})}>
                {'Cancel'}
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="p-3">
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>{'User'}</th>
                <th>{'Title'}</th>
                <th>{'Date'}</th>
                <th>{'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, i) => {
                const date = new Date(parseInt(schedule.date))
                return (
                  <tr key={schedule._id}>
                    <td>{i+1}</td>
                    <td>{schedule.creator.name}</td>
                    <td>{schedule.title}</td>
                    <td>{getDateValue(_.get(schedule, 'date'))}</td>
                    <td>
                      <div>
                        <Button
                          color="warning"
                          size="sm"
                          onClick={() => {
                            setSchedule({
                              ...schedule,
                              creator: schedule.creator.name
                            });
                            setOpenForm(true);
                            setIsEdit(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="mx-1"
                          color="danger"
                          size="sm"
                          onClick={() => handleClickDelete({
                            id: schedule._id,
                            creator: schedule.creator.name,
                          })}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Layout>
  );
}

export default Schedule;
