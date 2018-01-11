package org.activiti;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class HireProcessRestController {

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private ApplicantRepository applicantRepository;

	@Autowired
	private TaskService taskService;

	@ResponseStatus(value = HttpStatus.OK)
	@RequestMapping(value = "/start-hire-process", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void startHireProcess(@RequestBody Map<String, String> data) {

		Applicant applicant = new Applicant(data.get("name"), data.get("type"), data.get("phoneNumber"));
		applicantRepository.save(applicant);

		Map<String, Object> vars = Collections.<String, Object>singletonMap("applicant", applicant);
		runtimeService.startProcessInstanceByKey("hireProcessWithJpa", vars);
	}

}