run :
	docker run --name logapp-container -v logs:/app/data -d -p 5000:4444 -e PORT=4444 --rm logapp:volume

stop:
	docker stop logapp-container

log:
	docker logs logapp-container


